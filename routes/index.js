const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");

const passport = require("../passport/config");

router.get("/", function (req, res){
    res.send("Welcome to index route!");
});

/// USER ROUTES ///

// POST - Sign Up
router.post("/signup", userController.signup);

// POST - Log In
router.post("/login", userController.login);

// POST - Custom Bursts - Username List
router.post("/users", passport.authenticate("jwt", { session: false }), userController.user_list);

// GET - Total User Count
router.get("/users/count", passport.authenticate("jwt", { session: false }), userController.user_count);

// GET - User Detail
router.get("/users/:userid", passport.authenticate("jwt", { session: false }), userController.user_detail);

// GET - Username
router.get("/users/:userid/username", passport.authenticate("jwt", { session: false }), userController.user_name);

/// POST ROUTES ///

// POST - Post List
router.post("/posts", passport.authenticate("jwt", { session: false }), postController.post_list);

// POST - Post Count
router.post("/posts/count", passport.authenticate("jwt", { session: false }), postController.post_count);

// GET - Post Detail
router.get("/posts/:postid", passport.authenticate("jwt", { session: false }), postController.post_detail);

/// COMMENT ROUTES ///

// GET - Comment List
router.get("/comments", passport.authenticate("jwt", { session: false }), commentController.comment_list);

// POST - Comment Count
router.post("/comments/count", passport.authenticate("jwt", { session: false }), commentController.comment_count);

module.exports = router;