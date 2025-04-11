const asyncHandler = require("express-async-handler");
const Post = require("../models/post");

exports.post_list = asyncHandler(async (req, res, next) => {

    const posts = await Post.find().populate("author")

        .skip(req.body.postsPerPage * (req.body.pageNumber - 1)) // Skipping Previous Page Entries.
        .limit(req.body.postsPerPage)

        .exec();

    res.status(200).json(posts);
});

exports.post_count = asyncHandler(async (req, res, next) => {

    const count = req.body.authorId ? await Post.find({ "author": req.body.authorId }).countDocuments().exec() 
        : await Post.find().countDocuments().exec();
        
    res.status(200).json(count);
});

exports.post_detail = asyncHandler(async (req, res, next) => {

    const post = await Post.findById(req.params.postid).populate("author").exec();
    res.status(200).json(post);
});