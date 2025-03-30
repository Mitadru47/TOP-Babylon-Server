const asyncHandler = require("express-async-handler");
const Comment = require("../models/comment");

exports.comment_list = asyncHandler(async (req, res, next) => {

    const comments = await Comment.find().exec();
    res.status(200).json(comments);
});

exports.comment_count = asyncHandler(async (req, res, next) => {

    const count = await Comment.find({ "author": req.body.authorId }).countDocuments().exec();
    res.status(200).json(count);
});