const asyncHandler = require("express-async-handler");
const User = require("../models/user");

exports.login = asyncHandler(async (req, res, next) => {

    const user = await User.findOne({ username: req.body.username }).exec();

    if(user){

        if(user.password === req.body.password)
            res.status(200).json("Login Successful!");
            
        else
            res.status(401).json("Incorrect Password!");      
    }

    else
        res.status(401).json("Incorrect Username!");
});

exports.user_list = asyncHandler(async (req, res, next) => {

    const users = await User.find().exec();
    res.status(200).json(users.map((user) => user.username));
});

exports.user_count = asyncHandler(async (req, res, next) => {
    
    const count = await User.countDocuments ().exec();
    res.status(200).json(count);
});