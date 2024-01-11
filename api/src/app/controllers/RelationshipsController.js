const { Relationships } = require("../models/Relationships");

class RelationshipsControler {
  // Relationships
  // Relationships /relationships
  createRelationships = async (req, res, next) => {
    const newRelationships = new Relationships(req.body);
    try {
      await newRelationships.save();

      res.json(newRelationships);
    } catch (error) {
      next(error);
    }
  };

  // Get a Relationships
  // GET /:id
  getRelationshipsDetail = async (req, res, next) => {
    const getDetail = await Relationships.findById(req.params.id);
    try {
      res.json(getDetail);
    } catch (error) {
      next(error);
    }
  };

  // findRelationships
  // GET /find
  findRelationships = async (req, res, next) => {
    const filterQuery = req.body.filterQuery ? req.body.filterQuery : {};
    const options = req.body.options ? req.body.options : {};
    let query = { ...filterQuery };
    if (filterQuery.search) {
      query.$text = { $search: filterQuery.search };
      delete query.search;
    }
    await Relationships.find(query, null, options)
      .then((result) => {
        if (!result) {
          res.send("404");
        } else {
          res.send(result);
        }
      })
      .catch(next);
  };

  // update Relationships
  // PUT /relationships/:id
  updateRelationships = async (req, res, next) => {
    const RelationshipsDetail = await Relationships.findById(req.params.id);
    let result = null;
    try {
      const type = req.body.type;
      const targetId = req.body.targetId;
      const meId = req.body.meId;
      if (type === "follow") {
        if (RelationshipsDetail.following.includes(targetId)) {
          const data = await Relationships.findByIdAndUpdate(
            RelationshipsDetail._id,
            {
              $pull: { following: targetId },
            }
          );
          await Relationships.findOneAndUpdate(
            { userId: targetId },
            {
              $pull: { followers: meId },
            }
          );
          result = { message: "Đã bỏ theo dõi người dùng", data };
        } else {
          const data = await Relationships.findByIdAndUpdate(
            RelationshipsDetail._id,
            {
              $addToSet: { following: targetId },
            }
          );
          await Relationships.findOneAndUpdate(
            { userId: targetId },
            {
              $addToSet: { followers: meId },
            }
          );
          result = { message: "Đã theo dõi người dùng", data };
        }
      } else if (type === "block") {
        if (RelationshipsDetail.blocks.includes(targetId)) {
          await Relationships.findByIdAndUpdate(RelationshipsDetail._id, {
            $pull: { blocks: targetId },
          });
          result = { message: "Đã bỏ chặn người dùng" };
        } else {
          await Relationships.findByIdAndUpdate(RelationshipsDetail._id, {
            $addToSet: { blocks: targetId },
          });

          const data = await Relationships.findByIdAndUpdate(
            RelationshipsDetail._id,
            {
              $pull: { following: targetId },
            }
          );
          await Relationships.findOneAndUpdate(
            { userId: targetId },
            {
              $pull: { followers: meId },
            }
          );
          result = { message: "Đã chặn người dùng", data };
        }
      } else if (type === "hiddedPost") {
        if (RelationshipsDetail.postHiddeds.includes(targetId)) {
          await Relationships.findByIdAndUpdate(RelationshipsDetail._id, {
            $pull: { postHiddeds: targetId },
          });
          result = { message: "Đã bỏ ẩn bài viết" };
        } else {
          await Relationships.findByIdAndUpdate(RelationshipsDetail._id, {
            $addToSet: { postHiddeds: targetId },
          });
          result = { message: "Đã ẩn bài viết" };
        }
      } else if (type === "hiddedChat") {
        if (RelationshipsDetail.chatHiddens.includes(targetId)) {
          await Relationships.findByIdAndUpdate(RelationshipsDetail._id, {
            $pull: { chatHiddens: targetId },
          });
          result = { message: "Đã bỏ ẩn đoạn hội thoại" };
        } else {
          await Relationships.findByIdAndUpdate(RelationshipsDetail._id, {
            $addToSet: { chatHiddens: targetId },
          });
          result = { message: "Đã ẩn đoạn hội thoại" };
        }
      } else if (type === "deleteChat") {
        await Relationships.findByIdAndUpdate(RelationshipsDetail._id, {
          $addToSet: { chatDeletes: targetId },
        });
        result = { message: "Đã xóa đoạn hội thoại" };
      }

      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  // delete Relationships
  // DELETE /relationships/:id
  deleteRelationships = async (req, res, next) => {
    await Relationships.findByIdAndDelete(req.params.id);
    try {
      res.json({ message: "Xóa trạng thái thành công!" });
    } catch (error) {
      next(error);
    }
  };
}
module.exports = new RelationshipsControler();
