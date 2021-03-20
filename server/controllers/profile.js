const express = require("express");
const Profile = require("../models/profile");
const {sendError, errEnum} = require('../errors');
const uploader = require("../utils/uploader");

class ProfileController {
    constructor() {
        this.path = "/profile";
        this.router = express.Router();
        this.initRoutes();
    }

    initRoutes() {
        this.router.post('/modify', uploader.single("audio") ,async (req, res) => {
            if(!req.file){ 
                return sendError(req, res, errEnum.FORM_ERROR);
            }
            try{
                if (!req.session.user) {
                    return sendError(req, res, errEnum.WRONG_SESSION);
                } else {
                    const user = await User.findOne({id: req.session.user.id});
                    let profile = await Profile.findOne({user: user._id});
                    if(!profile) {
                        const newProfile = new Profile({
                            audio: `/uploads/${req.file.filename}`,
                            sex: req.body.sex,
                            mood: "happy",
                        });
                        profile = await newProfile.save();
                    } else {
                        Profile.update(profile, {$set: {
                            audio: `/uploads/${req.file.filename}`,
                            mood: "happy"
                        }});
                    }
                    return res.json({
                        success: true
                    });
                }
            } catch (err) {
                return sendError(req, res, errEnum.DEFAULT);
            }
        })
    }
}

module.exports = ProfileController;