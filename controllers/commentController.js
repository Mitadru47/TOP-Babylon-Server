const asyncHandler = require("express-async-handler");
const Comment = require("../models/comment");

exports.comment_list = asyncHandler(async (req, res, next) => {

    const comments = await Comment.find().exec();
    res.status(200).json(comments);
});