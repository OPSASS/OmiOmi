const router = require("express").Router();
const CommentController = require("../app/controllers/CommentController");

// create Comment new
// /comment
router.post("/", CommentController.createComment);

// /comment/find
router.post("/find", CommentController.findComment);

// update Comment
// /comment/:id
router.put("/:id", CommentController.updateComment);

// delete Comment
// /comment/:id/delete
router.delete("/:id", CommentController.deleteComment);

module.exports = router;
