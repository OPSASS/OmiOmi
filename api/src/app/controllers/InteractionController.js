const { Interaction } = require("../models/Interaction");

class InteractionControler {
  // Interaction
  // Interaction /Interaction
  createInteraction = async (req, res, next) => {
    const newInteraction = new Interaction(req.body);
    try {
      await newInteraction.save();

      res.json(newInteraction);
    } catch (error) {
      next(error);
    }
  };

  // Get a Interaction
  // GET /:id
  getInteractionDetail = async (req, res, next) => {
    const Interaction = await Interaction.findById(req.params.id);
    try {
      res.json(Interaction);
    } catch (error) {
      next(error);
    }
  };

  // findInteraction
  // GET /find
  findInteraction = async (req, res, next) => {
    const filterQuery = req.body.filterQuery ? req.body.filterQuery : {};
    const options = req.body.options ? req.body.options : {};
    let query = { ...filterQuery };
    if (filterQuery.search) {
      query.$text = { $search: filterQuery.search };
      delete query.search;
    }
    await Interaction.find(query, null, options)
      .then((result) => {
        if (!result) {
          res.send("404");
        } else {
          res.send(result);
        }
      })
      .catch(next);
  };

  // update Interaction
  // PUT /Interaction/:id
  updateInteraction = async (req, res, next) => {
    const InteractionDetail = await Interaction.findById(req.params.id);
    let result = null;
    try {
      const type = req.body.type;
      const targetId = req.body.targetId;
      if (type === "favorites") {
        if (InteractionDetail.favorites.includes(targetId)) {
          const data = await Interaction.findByIdAndUpdate(
            InteractionDetail._id,
            {
              $pull: { favorites: targetId },
            }
          );
          result = { message: "Đã thả cảm xúc", data };
        } else {
          const data = await Interaction.findByIdAndUpdate(
            InteractionDetail._id,
            {
              $addToSet: { favorites: targetId },
            }
          );
          result = { message: "Hoàn tác thả cảm xúc", data };
        }
      } else if (type === "comments") {
        const data = await Interaction.findByIdAndUpdate(
          InteractionDetail._id,
          {
            $addToSet: { comments: targetId },
          }
        );
        result = { message: "Đã gửi bình luận", data };
      } else if (type === "shares") {
        const data = await Interaction.findByIdAndUpdate(
          InteractionDetail._id,
          {
            $addToSet: { shares: targetId },
          }
        );
        result = { message: "Đã chia sẻ", data };
      } else if (type === "emotions") {
        if (InteractionDetail.emotions.includes(targetId)) {
          const data = await Interaction.findByIdAndUpdate(
            InteractionDetail._id,
            {
              $pull: { emotions: targetId },
            }
          );
          result = { message: "Đã thả cảm xúc", data };
        } else {
          const data = await Interaction.findByIdAndUpdate(
            InteractionDetail._id,
            {
              $addToSet: { emotions: targetId },
            }
          );
          result = { message: "Hoàn tác thả cảm xúc", data };
        }
      } else if (type === "recalls") {
        const data = await Interaction.findByIdAndUpdate(
          InteractionDetail._id,
          {
            $addToSet: { recalls: targetId },
          }
        );
        result = { message: "Đã thu hồi tin nhắn", data };
      } else if (type === "shares") {
        const data = await Interaction.findByIdAndUpdate(
          InteractionDetail._id,
          {
            $addToSet: { deletes: targetId },
          }
        );
        result = { message: "Đã xóa tin nhắn", data };
      }
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  // delete Interaction
  // DELETE /Interaction/:id
  deleteInteraction = async (req, res, next) => {
    await Interaction.findByIdAndDelete(req.params.id);
    try {
      res.json({ message: "Xóa bài thành công!" });
    } catch (error) {
      next(error);
    }
  };
}
module.exports = new InteractionControler();
