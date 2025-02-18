const { issueJWT } = require("../utils/generateJWT");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const User = require("../models/user");

exports.login = [

    body("username", "Username cannot be empty.").trim().isLength({ min: 1 }).escape(),
    body("password", "Password cannot be empty.").trim().isLength({ min: 1 }).escape(),

    asyncHandler(async (req, res, next) => {

        const sanitationErrors = validationResult(req);

        if(sanitationErrors.isEmpty()){

            const user = await User.findOne({ username: req.body.username }).exec();

            if(user){

                if(user.password === req.body.password){
                
                    const generatedJWT = issueJWT(user._id);
                    res.status(200).json({ uid: user._id, token: generatedJWT.token, expiresIn: generatedJWT.expiresIn });
                }
                    
                else
                    res.status(401).json("Incorrect Password!");      
            }

            else
                res.status(401).json("Incorrect Username!");
        }

        else
            res.status(400).json(sanitationErrors.errors); 
    })
];

exports.user_list = asyncHandler(async (req, res, next) => {

    const users = await User.find().exec();
    res.status(200).json(users.map((user) => user.username));
});

exports.user_count = asyncHandler(async (req, res, next) => {
    
    const count = await User.countDocuments ().exec();
    res.status(200).json(count);
});