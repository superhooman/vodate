const express = require('express');
const User = require('../models/user');
const Match = require('../models/match');
const Left = require('../models/left');
const {sendError, errEnum} = require('../errors');
const Profile = require('../models/profile');
const axios = require('axios');

class MatchController {
  constructor() {
    this.path = '/match';
    this.router = express.Router();
    this.initRoutes();
  }

  initRoutes() {
      // ?profile=id
      this.router.get('/left', async(req, res) => {
        if(!req.session.user){
            return sendError(req, res, errEnum.WRONG_SESSION);
        }
        if(!req.query.profile || req.query.profile.length !== 24){
            return sendError(req, res, errEnum.WRONG_ID);
        }
        const profile = await Profile.findById(req.query.profile);
        if(!profile){
            return sendError(req, res, errEnum.WRONG_ID);
        }
        const user = await User.findOne({id: req.session.user.id});
        let left = await Left.findOne({user: user._id});
        if(!left){
            left = await (new Left({
                user: user._id,
                users: []
            })).save()
        }
        await Left.findByIdAndUpdate(left._id, {
            $push: {
                users: profile.user
            }
        })
        return res.json({
            success: true
        })
      })
    this.router.get('/right', async (req, res) => {
        if(!req.session.user){
            return sendError(req, res, errEnum.WRONG_SESSION);
        }
        if(!req.query.profile || req.query.profile.length !== 24){
            return sendError(req, res, errEnum.WRONG_ID);
        }
        const profile = await Profile.findById(req.query.profile);
        if(!profile){
            return sendError(req, res, errEnum.WRONG_ID);
        }
        const user = await User.findOne({id: req.session.user.id});
        const exists = await Match.findOne({
            $or:[
                {
                    users: [user._id, profile.user]
                },
                {
                    users: [profile.user, user._id]
                }
            ]
        });
        if(exists && !exists.mutual && exists.inited !== user._id){
            //todo: send push
            const m = (await Match.findById(exists._id).populate('users')).users.map(u => u.id);
            m.forEach(async (id) => {
                if(process.env.NODE_ENV !== "production"){
                    return;
                }
                const data = {
                    locale: 1,
                    message: 'У вас новая пара',
                    title: 'VoDate',
                    app_id: '2d02e55c-896c-11eb-a224-6ac7ec087d2d',
                    user_id: id
                }
                function makeStringToHash(input) {
                    if (Array.isArray(input)) {
                        return input.map(makeStringToHash).join('');
                    } else if (typeof input === 'object') {
                        return Object.keys(input)
                            .filter((key) => input[key] && (!Array.isArray(input[key]) || input[key].length > 0) && (typeof input[key] !== 'object' || Object.keys(input[key]).length > 0))
                            .sort()
                            .map((key) => `${key}:${makeStringToHash(input[key])}`)
                            .join('');
                    } else {
                        return String(input);
                    }
                }
                const hmac = require('crypto').createHmac('sha256', process.env.APIKEY);
                const base64URLUnsafeHash = hmac.update(makeStringToHash(data)).digest('base64');
                const calculatedSign = base64URLUnsafeHash.replace(/\+/g, '-').replace(/\//g, '_');
                await axios({
                    url: 'https://api.miniapps.aitu.io/kz.btsd.messenger.apps.public.MiniAppsPublicService/SendPush',
                    method: 'POST',
                    data: {
                        ...data,
                        sign: calculatedSign
                    }
                }).then((res) => {
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
            })
            exists.mutual = true;
            await exists.save();
            return res.json({
                success: true,
                match: true
            })
        }else{
            const match = new Match({
                users: [user._id, profile.user],
                inited: user._id
            })
            await match.save()
            return res.json({
                success: true,
                match: false
            })
        }
    })
    this.router.get('/my', async (req, res) => {
        if(!req.session.user){
            return sendError(req, res, errEnum.WRONG_SESSION);
        }
        const user = await User.findOne({id: req.session.user.id})
        const matches = await Match.find({
            users: user._id,
            mutual: true
        }).populate('users')
        return res.json({
            success: true,
            matches
        })
    })
  }
}

module.exports = MatchController;
