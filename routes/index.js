const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");

router.get("/", function (req, res){
    res.send("Welcome to index route!");
});

/// USER ROUTES ///

// GET - User List
router.get("/users", userController.user_list);

/// POST ROUTES ///

// GET - Post List
router.get("/posts", postController.post_list);

/// COMMENT ROUTES ///

// GET - Comment List
router.get("/comments", commentController.comment_list);

module.exports = router;