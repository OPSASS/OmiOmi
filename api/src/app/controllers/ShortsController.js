const { Shorts } = require("../models/Shorts");
const { Interaction } = require("../models/Interaction");

class ShortsControler {
  // shorts
  // Shorts /shorts
  createShorts = async (req, res, next) => {
    const newShort = new Shorts(req.body);
    try {
      await newShort.save();
      const newInteraction = new Interaction({
        targetId: newShort._id,
        type: "SHORT",
        favorites: [],
        comments: [],
        shares: [],
      });
      await newInteraction.save();
      const post = await Shorts.findByIdAndUpdate(newShort._id, {
        interactionId: newInteraction._id,
      });
      res.json(post);
    } catch (error) {
      next(error);
    }
  };

  // Get all Shorts
  // GET /shorts
  findShorts = async (req, res, next) => {
    const filterQuery = req.body.filterQuery ? req.body.filterQuery : {};
    const options = req.body.options ? req.body.options : {};
    let query = { ...filterQuery };
    if (filterQuery.search) {
      query.$text = { $search: filterQuery.search };
      delete query.search;
    }
    await Shorts.find(query, null, options)
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

  // Get a Shorts
  // GET /shorts/:id
  getShortDetail = async (req, res, next) => {
    const shorts = await Shorts.findById(req.params.id).populate([
      {
        path: "userData",
        select: "fullname avtPicture",
      },
      { path: "interactionData" },
      { path: "countComment" },
    ]);
    try {
      res.json(shorts);
    } catch (error) {
      next(error);
    }
  };

  // update Shorts
  // PUT /shorts/:id/edit
  updateShorts = async (req, res, next) => {
    await Shorts.findByIdAndUpdate(req.params.id, req.body);
    try {
      res.json({ message: "Cập nhật thành công!" });
    } catch (error) {
      next(error);
    }
  };

  // delete Shorts
  // DELETE /shorts/:id
  deleteShorts = async (req, res, next) => {
    await Shorts.findByIdAndDelete(req.params.id);
    try {
      res.json({ message: "Xóa bài thành công!" });
    } catch (error) {
      next(error);
    }
  };
}
module.exports = new ShortsControler();
