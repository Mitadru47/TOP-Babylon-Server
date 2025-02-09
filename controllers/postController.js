const asyncHandler = require("express-async-handler");
const Post = require("../models/post");

exports.post_list = asyncHandler(async (req, res, next) => {

    const posts = await Post.find().populate("author").exec();
    res.status(200).json(posts);
});

exports.post_count = asyncHandler(async (req, res, next) => {

    const count = await Post.countDocuments().exec();
    res.status(200).json(count);
});