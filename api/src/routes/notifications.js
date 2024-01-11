const router = require("express").Router();
const NotificationsController = require("../app/controllers/NotificationsController");

// [POST]
// gui thong bao
// /notifications/:id
router.post("/", NotificationsController.postNotifications);

router.put("/:id", NotificationsController.putNotifications);

// [GET]
// nhan 1 thong bao
// /notifications/:id
router.get("/user/:id", NotificationsController.getNotificationsByUser);

// nhan tat ca thong bao
// /notifications
router.post("/find", NotificationsController.findNotifications);

// [DELETE]
// xoa thong bao
// /notifications/:id/delete
router.delete("/:id", NotificationsController.deleteNotifications);

module.exports = router;
