const express = require('express');
const User = require('../models/user');
const Match = require('../models/match');
const {sendError, errEnum} = require('../errors');
const Profile = require('../models/profile');

class MatchController {
  constructor() {
    this.path = '/match';
    this.router = express.Router();
    this.initRoutes();
  }

  initRoutes() {
      // ?profile=id
    this.router.get('/add', async (req, res) => {
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
            users: {
                $in: [user._id, profile.user]
            }
        });
        if(exists){
            //todo: send push
            exists.mutual = true;
            await exists.save();
            return res.json({
                success: true,
                match: true
            })
        }else{
            const match = new Match({
                users: [user._id, profile.user]
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
        const matches = await Match.findOne({
            users: user._id
        });
        return res.json({
            success: true,
            matches
        })
    })
  }
}

module.exports = MatchController;
