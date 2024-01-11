const { Watched } = require("../models/Watched");
const { Message } = require("../models/Message");

class WatchedController {
  createWatched = async (req, res, next) => {
    const targetId = req.params.targetId;
    const getDetail = await Watched.findOne({
      targetId,
      userId: req.body.userId,
    });
    try {
      if (!getDetail) {
        const newWatched = new Watched({ ...req.body, targetId });
        await newWatched.save();
        res.json(newWatched);
      } else {
        res.json(getDetail);
      }
    } catch (error) {
      next(error);
    }
  };

  updateWatchedDetail = async (req, res, next) => {
    const WatchedDetail = await Watched.findById(req.params.id);
    let result = null;
    try {
      if (WatchedDetail) {
        result = await Watched.findByIdAndUpdate(req.params.id, {
          watched: !WatchedDetail.watched,
        });
      }
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  getWatchedUser = async (req, res, next) => {
    const watchedData = await Watched.find({ userId: req.params.id });

    try {
      let result = [];
      if (watchedData) {
        for (const item of watchedData) {
          try {
            const count = await Message.countDocuments({
              chatId: item.targetId,
              createdAt: { $gte: item.updatedAt, $lte: new Date() },
            });

            const data = await Watched.findByIdAndUpdate(item._id, { count });
            result.push(data);
          } catch (error) {
            console.error("Lỗi xử lý cho mục:", item, error);
          }
        }
      }
      res.json(result);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new WatchedController();
