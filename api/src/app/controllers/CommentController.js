const { Comment } = require("../models/Comment");
const { Interaction } = require("../models/Interaction");
class CommentController {
  createComment = async (req, res, next) => {
    const newComment = new Comment(req.body);
    try {
      const newInteraction = new Interaction({
        targetId: newComment._id,
        type: "COMMENT",
        favorites: [],
        comments: [],
        shares: [],
      });
      await newInteraction.save();

      newComment.interactionId = newInteraction._id;
      await newComment.save();

      res.json(newComment);
    } catch (error) {
      next(error);
    }
  };

  findComment = async (req, res, next) => {
    const filterQuery = req.body.filterQuery ? req.body.filterQuery : {};
    const options = req.body.options ? req.body.options : {};
    let query = { ...filterQuery };
    if (filterQuery.search) {
      query.$text = { $search: filterQuery.search };
      delete query.search;
    }
    await Comment.find(query, null, options)
      .populate([
        {
          path: "userData",
          select: "fullname avtPicture",
        },
        { path: "interactionData" },
        { path: "childData" },
        { path: "countChild" },
      ])
      .then((result) => {
        if (!result) {
          res.send("404");
        } else {
          res.send(result);
        }
      })
      .catch(next);
  };

  // update comment
  // PUT /comment/:id
  updateComment = async (req, res, next) => {
    await Comment.findByIdAndUpdate(req.params.id, req.body);
    try {
      res.json({ message: "Cập nhật thành công!" });
    } catch (error) {
      next(error);
    }
  };

  // delete comment
  // DELETE /comment/:id/delete
  deleteComment = async (req, res, next) => {
    await Comment.findByIdAndDelete(req.params.id);
    try {
      res.json({ message: "Xóa bình luận thành công!" });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new CommentController();
