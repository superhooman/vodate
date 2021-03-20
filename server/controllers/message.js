const express = require('express');
const Message = require("../models/message");
const User = require('../models/user');
const {sendError, errEnum} = require('../errors');
const uploader = require("../utils/uploader");

class MessageController {
    constructor() {
        this.path = '/chat';
        this.router = express.Router();
        this.initRoutes();
    }
    initRoutes() {
        this.router.post("/send/:id", uploader.single("audio") ,async (req, res) => {
            if(!req.file){ 
                return sendError(req, res, errEnum.FORM_ERROR);
            }
            try{
                if (!req.session.user) {
                    return sendError(req, res, errEnum.WRONG_SESSION);
                } else {
                    const currUser = await User.findOne({id: req.session.user.id});
                    const secondUser = await User.findById(req.params.id);
                    const newMessage = new Message({
                        from: currUser._id,
                        to: secondUser._id,
                        date: new Date(),
                        audio: `/uploads/${req.file.filename}`
                    });
                    await newMessage.save();
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
