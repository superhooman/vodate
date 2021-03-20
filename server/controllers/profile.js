const express = require("express");
const Profile = require("../models/profile");
const User = require('../models/user');
const { sendError, errEnum } = require('../errors');
const uploader = require("../utils/uploader");
const auth = require("../utils/auth");

class ProfileController {
    constructor() {
        this.path = "/profile";
        this.router = express.Router();
        this.initRoutes();
    }

    initRoutes() {
        this.router.get('/', auth, async (req, res) => {
            const user = await User.findOne({ id: req.session.user.id });
            if (!user) {
                res.session.destroy();
                return sendError(req, res, errEnum.WRONG_SESSION)
            }
            const profile = await Profile.findOne({ user: user._id });
            return res.json({
                success: true,
                profile
            })
        })
        this.router.post('/', [auth, uploader.single("audio")], async (req, res) => {
            if (!req.file) {
                return sendError(req, res, errEnum.FORM_ERROR);
            }
            try {
                const user = await User.findOne({ id: req.session.user.id });
                let profile = await Profile.findOne({ user: user._id });
                if (!profile) {
                    const newProfile = new Profile({
                        audio: `/uploads/${req.file.filename}`,
                        sex: req.body.sex,
                        mood: "happy",
                    });
                    profile = await newProfile.save();
                } else {
                    profile = await Profile.findByIdAndUpdate(profile._id, {
                        audio: `/uploads/${req.file.filename}`,
                        mood: "happy"
                    }, {
                        new: true
                    });
                }
                return res.json({
                    success: true,
                    profile
                });
            } catch (err) {
                return sendError(req, res, errEnum.DEFAULT);
            }
        })
    }
}

module.exports = ProfileController;