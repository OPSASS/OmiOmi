const { User } = require("../models/User");
const { Posts } = require("../models/Posts");
const { Repost } = require("../models/admin/Repost");
const { Feedback } = require("../models/admin/Feedback");
const { Request } = require("../models/admin/Request");
const bcrypt = require("bcrypt");
const { System } = require("../models/admin/System");
const { Visit } = require("../models/Visit");
const moment = require("moment");

class AdminController {
  // GET /dashboard
  getDashboard = async (req, res, next) => {
    try {
      const currentDate = new Date();
      const oneWeekAgo = new Date(
        currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
      );

      const newUserCount = await User.countDocuments({
        createdAt: { $gte: oneWeekAgo },
      });

      // Tính số lượng post mới trong tuần
      const newPostCount = await Posts.countDocuments({
        createdAt: { $gte: oneWeekAgo },
      });

      // Tính số lượng feedback mới trong tuần
      const newFeedbackCount = await Feedback.countDocuments({
        createdAt: { $gte: oneWeekAgo },
      });

      // Lấy số liệu từ tuần trước
      const oneWeekBefore = new Date(
        oneWeekAgo.getTime() - 7 * 24 * 60 * 60 * 1000
      );
      const oldUserCount = await User.countDocuments({
        createdAt: { $gte: oneWeekBefore, $lt: oneWeekAgo },
      });
      const oldPostCount = await Posts.countDocuments({
        createdAt: { $gte: oneWeekBefore, $lt: oneWeekAgo },
      });
      const oldFeedbackCount = await Feedback.countDocuments({
        createdAt: { $gte: oneWeekBefore, $lt: oneWeekAgo },
      });
      // Tính phần trăm tăng trưởng
      const userGrowth = ((newUserCount - oldUserCount) / oldUserCount) * 100;
      const postGrowth = ((newPostCount - oldPostCount) / oldPostCount) * 100;
      const feedbackGrowth =
        ((newFeedbackCount - oldFeedbackCount) / oldFeedbackCount) * 100;

      // Gửi thông tin về dashboard
      res.json({
        newUserCount,
        newPostCount,
        newFeedbackCount,
        userGrowth,
        postGrowth,
        feedbackGrowth,
      });
    } catch (error) {
      next(error);
    }
  };

  // PUT /admin/user/:id/resetpass
  resetPass = async (req, res, next) => {
    const user = await User.findById(req.params.id);
    try {
      if (user.CCCD == req.body.CCCD) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        user.password = hashedPassword;
        await user.save();
        res.json({ message: "Cấp mật khẩu thành công!" });
      } else {
        res.status(500).json({ message: "Số CCCD không hợp lệ!" });
      }
    } catch (error) {
      next(error);
    }
  };

  // PUT /admin/add/:id
  addAdmin = async (req, res, next) => {
    await User.findByIdAndUpdate(req.params.id, {
      isAdmin: true,
    });
    try {
      res.json({ message: "Thêm Admin thành công!" });
    } catch (error) {
      next(error);
    }
  };

  // PUT /admin/dele/:id
  deleAdmin = async (req, res, next) => {
    await User.findByIdAndUpdate(req.params.id, {
      isAdmin: false,
    });
    try {
      res.json({ message: "Đã hủy quyền Admin cho người dùng!" });
    } catch (error) {
      next(error);
    }
  };

  // POST /feedback
  findFeedback = async (req, res, next) => {
    const filterQuery = req.body.filterQuery ? req.body.filterQuery : {};
    const options = req.body.options ? req.body.options : {};
    let query = { ...filterQuery };
    if (filterQuery.search) {
      query.$text = { $search: filterQuery.search };
      delete query.search;
    }
    await Feedback.find(query, null, options)
      .populate([
        {
          path: "userData",
          select: "fullname avtPicture",
        },
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

  deleteFeedback = async (req, res, next) => {
    try {
      await Feedback.findByIdAndRemove(req.params.id);
      res.json({ message: "Đã xóa phản hồi" });
    } catch (error) {
      next(error);
    }
  };

  userRepost = async (req, res, next) => {
    const sendRepost = new Repost(req.body);
    try {
      await sendRepost.save();
      res.json(sendRepost);
    } catch (error) {
      next(error);
    }
  };

  findRepost = async (req, res, next) => {
    const filterQuery = req.body.filterQuery ? req.body.filterQuery : {};
    const options = req.body.options ? req.body.options : {};

    let query = { ...filterQuery };
    if (filterQuery.search) {
      query.$text = { $search: filterQuery.search };
      delete query.search;
    }
    await Repost.find(query, null, options)
      .populate([
        {
          path: "userData",
          select: "fullname avtPicture",
        },
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

  deleteRepost = async (req, res, next) => {
    try {
      await Repost.findByIdAndDelete(req.params.id);
      res.json({ message: "Xóa thành công!" });
    } catch (error) {
      next(error);
    }
  };

  userFeedback = async (req, res, next) => {
    const sendFeedback = new Feedback(req.body);
    try {
      await sendFeedback.save();
      res.json(sendFeedback);
    } catch (error) {
      next(error);
    }
  };

  userRequest = async (req, res, next) => {
    const user = await User.findById(req.body.userId);
    try {
      const validity = await bcrypt.compare(req.body.password, user.password);
      const sendRequest = new Request({
        userId: req.body.userId,
        reason: req.body.reason,
        expireAt: new Date(),
      });
      if (!validity) {
        return res.status(404).json({ message: "Mật khẩu không đúng!" });
      } else {
        await sendRequest.save();
        res.json(sendRequest);
        // await User.findByIdAndUpdate(req.body.userId, { expireAt: new Date() });
      }
    } catch (error) {
      next(error);
    }
  };

  findRequest = async (req, res, next) => {
    const filterQuery = req.body.filterQuery ? req.body.filterQuery : {};
    const options = req.body.options ? req.body.options : {};
    let query = { ...filterQuery };
    if (filterQuery.search) {
      query.$text = { $search: filterQuery.search };
      delete query.search;
    }
    await Request.find(query, null, options)
      .populate([
        {
          path: "userData",
          select: "fullname avtPicture",
        },
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

  // Repost
  // POST /post/repost
  postRepost = async (req, res, next) => {
    const sendRepost = new Repost(req.body);
    try {
      await sendRepost.save();
      res.json(sendRepost);
    } catch (error) {
      next(error);
    }
  };

  deleteRequest = async (req, res, next) => {
    try {
      await Request.findByIdAndDelete(req.params.id);
      res.json({ message: "Xóa thành công!" });
    } catch (error) {
      next(error);
    }
  };

  deleteUser = async (req, res, next) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.json({ message: "Xóa tài khoản thành công!" });
    } catch (error) {
      next(error);
    }
  };

  system = async (req, res, next) => {
    const filterQuery = req.body.filterQuery ? req.body.filterQuery : {};
    const options = req.body.options ? req.body.options : {};
    await System.find(filterQuery, null, options)
      .then((result) => {
        if (!result) {
          res.send("404");
        } else {
          res.send(result);
        }
      })
      .catch(next);
  };

  systemOn = async (req, res, next) => {
    const maintenance = new System({ maintenance: true });
    try {
      await maintenance.save();
      res.json({ message: "Đã bật chế độ bảo trì" });
    } catch (error) {
      next(error);
    }
  };

  systemOff = async (req, res, next) => {
    const maintenance = new System({ maintenance: false });
    try {
      await maintenance.save();
      res.json({ message: "Đã tắt chế độ bảo trì" });
    } catch (error) {
      next(error);
    }
  };

  getVisit = async (req, res, next) => {
    try {
      const { type } = req.body;
      let pipeline = [];
      const currentDate = new Date();

      switch (type) {
        case "day":
          pipeline = [
            {
              $match: {
                timestamp: {
                  $gte: new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    currentDate.getDate()
                  ),
                },
              },
            },
            {
              $group: {
                _id: { $dateToString: { format: "%H:00", date: "$timestamp" } },
                count: { $sum: 1 },
              },
            },
          ];
          break;
        case "week":
          pipeline = [
            {
              $match: {
                timestamp: {
                  $gte: new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    currentDate.getDate() - currentDate.getDay()
                  ),
                },
              },
            },
            {
              $group: {
                _id: { $dayOfWeek: "$timestamp" },
                count: { $sum: 1 },
              },
            },
          ];
          break;
        case "month":
          pipeline = [
            {
              $match: {
                timestamp: {
                  $gte: new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    1
                  ),
                },
              },
            },
            {
              $group: {
                _id: { $dayOfMonth: "$timestamp" },
                count: { $sum: 1 },
              },
            },
          ];
          break;
        case "quarter":
          pipeline = [
            {
              $match: {
                timestamp: { $gte: new Date(currentDate.getFullYear(), 0, 1) },
              },
            },
            {
              $group: {
                _id: {
                  $switch: {
                    branches: [
                      {
                        case: { $lte: [{ $month: "$timestamp" }, 3] },
                        then: 1,
                      },
                      {
                        case: { $lte: [{ $month: "$timestamp" }, 6] },
                        then: 2,
                      },
                      {
                        case: { $lte: [{ $month: "$timestamp" }, 9] },
                        then: 3,
                      },
                    ],
                    default: 4,
                  },
                },
                count: { $sum: 1 },
              },
            },
          ];
          break;

        case "year":
          pipeline = [
            {
              $match: {
                timestamp: { $gte: new Date(currentDate.getFullYear(), 0, 1) },
              },
            },
            {
              $group: {
                _id: { $month: "$timestamp" },
                count: { $sum: 1 },
              },
            },
          ];
          break;

        default:
          break;
      }

      const result = await Visit.aggregate(pipeline);
      let data = [];

      switch (type) {
        case "day":
          data = Array.from({ length: 24 }, (_, index) => {
            const hour = `${index.toString().padStart(2, "0")}:00`;
            const matchingResult = result.find((item) => item._id === hour);
            return matchingResult ? matchingResult : { _id: hour, count: 0 };
          });
          break;
        case "week":
          data = Array.from({ length: 7 }, (_, index) => {
            const day = index + 2;
            const matchingResult = result.find((item) => item._id === day);
            return matchingResult ? matchingResult : { _id: day, count: 0 };
          });
          break;
        case "month":
          const daysInMonth = moment().daysInMonth();
          data = Array.from({ length: daysInMonth }, (_, index) => {
            const day = index + 1;
            const matchingResult = result.find((item) => item._id === day);
            return matchingResult ? matchingResult : { _id: day, count: 0 };
          });
          break;
        case "quarter":
          data = Array.from({ length: 4 }, (_, index) => {
            const day = index + 1;
            const matchingResult = result.find((item) => item._id === day);
            return matchingResult ? matchingResult : { _id: day, count: 0 };
          });
          break;
        case "year":
          data = Array.from({ length: 12 }, (_, index) => {
            const day = index + 1;
            const matchingResult = result.find((item) => item._id === day);
            return matchingResult ? matchingResult : { _id: day, count: 0 };
          });
          break;
        default:
          break;
      }

      res.json(data);
    } catch (error) {
      next(error);
    }
  };

  postVisit = async (req, res, next) => {
    const newVisit = new Visit(req.body);
    try {
      await newVisit.save();
      res.json(newVisit);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new AdminController();
