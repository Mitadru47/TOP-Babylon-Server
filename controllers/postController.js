const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const Post = require("../models/post");

exports.post_list = asyncHandler(async (req, res, next) => {

    const posts = await Post.find().sort({ dateCreated: -1}).populate("author")

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

exports.post_create = [

    body("title", "Title cannot be empty!").trim().isLength({ min: 1 }).escape(),
    body("body", "Body cannot be empty!").trim().isLength({ min: 1 }).escape(),

    body("author", "Author cannot be empty!").trim().isLength({ min: 1 }).escape(),

    asyncHandler(async (req, res, next) => {

       const error = validationResult(req);
       
       if(error.isEmpty()){

            if(!req.body.id){

                const post = new Post({
                
                    author: req.body.author,
                    
                    dateCreated: new Date(),
                    dateEdited: new Date(),
                    
                    title: req.body.title,
                    body: req.body.body
                });

                await post.save();            
                res.status(200).json({ status: "Success!", id: post._id });
            }
        }       

        else
            res.status(500).json({ status: "Failure!", error: error.errors });
    })
];