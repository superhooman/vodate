const express = require("express");
const Profile = require("../models/profile");
const path = require("path")
const User = require('../models/user');
const Match = require('../models/match');
const Left = require('../models/left');
const { sendError, errEnum } = require('../errors');
const uploader = require("../utils/uploader");
const auth = require("../utils/auth");
const axios = require("axios");

const getMood = (file) => new Promise((resolve, reject) => {
    const moodMap = {
        sad: 'sad',
        fear: 'sad',
        happy: 'happy',
        angry: 'happy',
        surprise: 'happy',
        disgust: 'sad',
        calm: 'neutral',
        neutral: 'neutral'
    }
    if(process.env.NODE_ENV !== "production"){
        return resolve('neutral');
    }
    axios({
        url: 'http://localhost:5000/predict',
        params: {
            path: path.join(process.cwd(), file)
        }
    }).then((res) => {
        if(res.data && res.data.Result){
            return resolve(moodMap[res.data.Result] || 'netural')
        }
    }).catch(err => {
        console.log(err);
        resolve('neutral')
    })
})

class ProfileController {
    constructor() {
        this.path = "/profile";
        this.router = express.Router();
        this.initRoutes();
    }

    initRoutes() {
        this.router.get('/list', auth, async (req, res) => {
            const user = await User.findOne({ id: req.session.user.id });
            const left = await Left.findOne({user: user._id});
            const matches = await Match.find({
                users: user._id
            })
            const profiles = await Profile.find({user: {
                $nin: [
                    ...(left ? left.users : []),
                    ...(matches.length > 0 ? [...matches.flatMap(el => el.users)] : []),
                    user._id
                ]
            }}).populate('user');
            return res.json({
                success: true,
                profiles
            })
        })
        this.router.delete('/', auth, async (req, res) => {
            const user = await User.findOne({ id: req.session.user.id });
            if (!user) {
                res.session.destroy();
                return sendError(req, res, errEnum.WRONG_SESSION)
            }
            const profile = await Profile.findOne({ user: user._id });
            profile.remove();
            return res.json({
                success: true,
            })
        })
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
                const mood = await getMood(`/uploads/${req.file.filename}`);
                const user = await User.findOne({ id: req.session.user.id });
                let profile = await Profile.findOne({ user: user._id });
                if (!profile) {
                    const newProfile = new Profile({
                        audio: `/uploads/${req.file.filename}`,
                        mood: mood,
                        user: user._id
                    });
                    profile = await newProfile.save();
                } else {
                    profile = await Profile.findByIdAndUpdate(profile._id, {
                        audio: `/uploads/${req.file.filename}`,
                        mood: mood
                    }, {
                        new: true
                    });
                }
                return res.json({
                    success: true,
                    profile
                });
            } catch (err) {
                console.log(err)
                return sendError(req, res, errEnum.DEFAULT);
            }
        })
    }
}

module.exports = ProfileController;