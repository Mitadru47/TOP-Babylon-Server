const asyncHandler = require("express-async-handler");
const Comment = require("../models/comment");

exports.comment_count = asyncHandler(async (req, res, next) => {

    const count = await Comment.find({ "author": req.body.authorId }).countDocuments().exec();
    res.status(200).json(count);
});

exports.comment_list = asyncHandler(async (req, res, next) => {

    const comments = await Comment.find({ "post": req.params.postid }).exec();
    res.status(200).json(comments);
});