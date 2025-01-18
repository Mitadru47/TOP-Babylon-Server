const asyncHandler = require("express-async-handler");
const Post = require("../models/post");

exports.post_list = asyncHandler(async (req, res, next) => {

    const posts = await Post.find().exec();
    res.status(200).json(posts);
});