const { Posts } = require("../models/Posts");
const { Interaction } = require("../models/Interaction");

class PostsControler {
  // post
  // POST /post
  createPost = async (req, res, next) => {
    const newPost = new Posts(req.body);
    try {
      await newPost.save();
      const newInteraction = new Interaction({
        targetId: newPost._id,
        type: "POST",
        favorites: [],
        comments: [],
        shares: [],
      });
      await newInteraction.save();
      const post = await Posts.findByIdAndUpdate(newPost._id, {
        interactionId: newInteraction._id,
      });
      res.json(post);
    } catch (error) {
      next(error);
    }
  };

  // Get a post
  // GET /:id
  getPostDetail = async (req, res, next) => {
    const post = await Posts.findById(req.params.id).populate([
      {
        path: "userData",
        select: "fullname avtPicture",
      },
      { path: "interactionData" },
      { path: "countComment" },
    ]);
    try {
      res.json(post);
    } catch (error) {
      next(error);
    }
  };

  // findPost
  // GET /find
  findPost = async (req, res, next) => {
    const filterQuery = req.body.filterQuery ? req.body.filterQuery : {};
    const options = req.body.options ? req.body.options : {};
    let query = { ...filterQuery };
    if (filterQuery.search) {
      query.$text = { $search: filterQuery.search };
      delete query.search;
    }
    await Posts.find(query, null, options)
      .populate([
        {
          path: "userData",
          select: "fullname avtPicture",
        },
        { path: "interactionData" },
        { path: "countComment" },
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

  // update post
  // PUT /post/:id
  updatePost = async (req, res, next) => {
    await Posts.findByIdAndUpdate(req.params.id, req.body);
    try {
      res.json({ message: "Cập nhật thành công!" });
    } catch (error) {
      next(error);
    }
  };

  // delete post
  // DELETE /post/:id
  deletePost = async (req, res, next) => {
    await Posts.findByIdAndDelete(req.params.id);
    try {
      res.json({ message: "Xóa bài thành công!" });
    } catch (error) {
      next(error);
    }
  };

  // delete post delay
  // GET /posts/:id/delete/delay
  deleteDelay = async (req, res, next) => {
    const post = await Posts.findById(req.params.id);
    setTimeout(() => {
      post.delete();
    }, 60000); // 1 minute
    res.redirect("/");
  };
}
module.exports = new PostsControler();
