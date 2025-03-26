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

// GET - Username
router.get("/users/:userid/username", passport.authenticate("jwt", { session: false }), userController.user_name);

// GET - User Detail
router.get("/users/:userid", passport.authenticate("jwt", { session: false }), userController.user_detail);

/// POST ROUTES ///

// POST - Post List
router.post("/posts", passport.authenticate("jwt", { session: false }), postController.post_list);

// GET - Post Count
router.get("/posts/count", passport.authenticate("jwt", { session: false }), postController.post_count);

/// COMMENT ROUTES ///

// GET - Comment List
router.get("/comments", passport.authenticate("jwt", { session: false }), commentController.comment_list);

module.exports = router;