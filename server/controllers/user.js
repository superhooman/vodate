const express = require('express');
const User = require('../models/user');
const verify = require('../utils/verify');
const {sendError, errEnum} = require('../errors');

class UserController {
  constructor() {
    this.path = '/user';
    this.router = express.Router();
    this.initRoutes();
  }

  initRoutes() {
    this.router.post('/auth', async (req , res) => {
        if(!req.body || typeof req.body !== 'object'){
            return sendError(req, res, errEnum.FORM_ERROR);
        }
        try{
            if(verify(req.body)){
                let user
                user = await User.findOne({id: req.body.id});
                if(!user){
                    const newUser = new User({
                        name: req.body.name,
                        lastName: req.body.lastName,
                        avatar: req.body.avatar,
                        id: req.body.id
                    })
                    user = await newUser.save();
                }
                req.session.user = {
                    avatar: user.avatar,
                    id: user.id,
                    name: user.name,
                    lastName: user.lastName,
                };
                return res.json({
                    success: true,
                    user: req.session.user,
                });
            }
        }catch(err){
            return sendError(req, res, errEnum.WRONG_AUTH);
        }
    });
    this.router.get('/me', async (req, res) => {
        if(!req.query.id){
            return sendError(req, res, errEnum.FORM_ERROR);
        }
        const user = await User.findOne({id: req.body.id});
        return res.json({
            success: !!user,
            user
        })
    })
  }
}

module.exports = UserController;
