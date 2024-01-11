const { Notifications } = require("../models/Notifications");

class NotificationsController {
  postNotifications = async (req, res, next) => {
    const targetId = req.body.targetId;
    const userId = req.body.userId;
    const sendId = req.body.sendId;
    // const notificationDetail = await Notifications.findOne({
    //   targetId,
    //   userId,
    // });

    const newNotification = new Notifications(req.body);
    try {
      await newNotification.save();
      const notification = await Notifications.findById(
        newNotification._id
      ).populate([
        {
          path: "userData",
          select: "fullname lastName avtPicture",
        },
      ]);
      res.json(notification);
    } catch (error) {
      next(error);
    }
  };

  putNotifications = async (req, res, next) => {
    try {
      await Notifications.findByIdAndUpdate(req.params.id, req.body);
      res.json({ message: "Cập nhật thành công!" });
    } catch (error) {
      next(error);
    }
  };

  getNotificationsByUser = async (req, res, next) => {
    try {
      const notifications = await Notifications.find({ userId: req.params.id })
        .populate([
          {
            path: "userData",
            select: "fullname lastName avtPicture",
          },
        ])
        .sort({
          createdAt: -1,
        });
      res.json(notifications);
    } catch (error) {
      next(error);
    }
  };

  findNotifications = async (req, res, next) => {
    const filterQuery = req.body.filterQuery ? req.body.filterQuery : {};
    const options = req.body.options ? req.body.options : {};
    let query = { ...filterQuery };
    if (filterQuery.search) {
      query.$text = { $search: filterQuery.search };
      delete query.search;
    }
    await Notifications.find(query, null, options)
      .populate([
        {
          path: "userData",
          select: "fullname lastName avtPicture",
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

  deleteNotifications = async (req, res, next) => {
    try {
      await Notifications.findByIdAndDelete(req.params.id);
      res.json({ message: "Xóa thông báo thành công!" });
    } catch (error) {
      next(error);
    }
  };
}
module.exports = new NotificationsController();
