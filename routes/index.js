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

// POST - Log In
router.post("/login", userController.login);

// GET - User List
router.get("/users", passport.authenticate("jwt", { session: false }), userController.user_list);

// GET - User Count
router.get("/users/count", passport.authenticate("jwt", { session: false }), userController.user_count);

// GET - User Name
router.get("/users/:userid", passport.authenticate("jwt", { session: false }), userController.user_name)

/// POST ROUTES ///

// POST - Post List
router.post("/posts", passport.authenticate("jwt", { session: false }), postController.post_list);

// GET - Post Count
router.get("/posts/count", passport.authenticate("jwt", { session: false }), postController.post_count);

/// COMMENT ROUTES ///

// GET - Comment List
router.get("/comments", passport.authenticate("jwt", { session: false }), commentController.comment_list);

module.exports = router;