const express = require("express");
const router = express.Router();

// Add Route
const PostsController = require("../app/controllers/PostsController");
// Post
// POST /post
router.post("/", PostsController.createPost);

// Get a post
// GET /post/:id
router.get("/:id", PostsController.getPostDetail);

// find post
// GET /post/find
router.post("/find", PostsController.findPost);

// Update POST
// PUT /post/:id
router.put("/:id", PostsController.updatePost);

// Delete Posts
// DELETE /post/:id
router.delete("/:id", PostsController.deletePost);

// Delete Posts Delay
// POST /post/:id/delete/delay
router.post("/:id/delete/delay", PostsController.deleteDelay);

module.exports = router;
