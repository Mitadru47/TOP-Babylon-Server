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

exports.signup = [

    body("firstName", "Firstname cannot be empty.").trim().isLength({ min: 1 }).escape(),
    body("lastName", "Lastname cannot be empty.").trim().isLength({ min: 1 }).escape(),

    body("email", "Email cannot be empty.").trim().isLength({ min: 1 }).escape(),
    body("email", "Invalid email format.").trim().isEmail().escape(),

    body("username", "Username cannot be empty.").trim().isLength({ min: 1 }).escape(),
    body("password", "Password cannot be empty.").trim().isLength({ min: 1 }).escape(),

    asyncHandler(async (req, res, next) => {

        const sanitationErrors = validationResult(req);

        if(sanitationErrors.isEmpty()){

            const user = await User.findOne({ username: req.body.username }).exec();

            if(user)
                res.status(409).json("Username already taken.");

            else{

                const newUser = new User({
            
                    dateJoined: new Date(),
            
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
            
                    email: req.body.email,
            
                    username: req.body.username,
                    password: req.body.password
                });
            
                await newUser.save();
                res.status(200).json("Success");
            }
        }

        else
            res.status(400).json(sanitationErrors.errors); 
    })
];

exports.user_list = asyncHandler(async (req, res, next) => {

    const users = await User.find()
    
        .skip(req.body.usernamesPerPage * (req.body.pageNumber - 1))
        .limit(req.body.usernamesPerPage)
    
        .exec();
    
    res.status(200).json(users.map((user) => user.username));
});

exports.user_count = asyncHandler(async (req, res, next) => {
    
    const count = await User.countDocuments ().exec();
    res.status(200).json(count);
});

exports.user_name = asyncHandler(async (req, res, next) => {

    const user = await User.findOne({ _id: req.params.userid }).exec();
    res.status(200).json(user.username);
});

exports.user_detail = asyncHandler(async (req, res, next) => {

    const user = await User.findOne({ _id: req.params.userid }).exec();
    res.status(200).json(user);
});