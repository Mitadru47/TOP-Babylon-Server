const asyncHandler = require("express-async-handler");
const User = require("../models/user");

exports.user_list = asyncHandler(async (req, res, next) => {

    const users = await User.find().exec();
    res.status(200).json(users);
});