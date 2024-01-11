const express = require("express");
const adminController = require("../app/controllers/AdminController");
const router = express.Router();

// render dashboard
// /admin/dashboard
router.get("/dashboard", adminController.getDashboard);

// reset pass
router.put("/user/:id/resetpass", adminController.resetPass);

// add admin
// /admin/add/:id
router.put("/add/:id", adminController.addAdmin);

// delete admin
router.put("/dele/:id", adminController.deleAdmin);

// /admin/feedback
router.post("/feedback/find", adminController.findFeedback);
// user/feedback
router.post("/user/feedback", adminController.userFeedback);
// delete feedback
// /admin/feedback/:id/delete
router.delete("/feedback/:id/delete", adminController.deleteFeedback);

// user/repost
router.post("/user/repost", adminController.userRepost);
router.post("/repost/find", adminController.findRepost);
router.delete("/repost/:id/delete", adminController.deleteRepost);

// user/request
router.post("/user/request", adminController.userRequest);
router.post("/request/find", adminController.findRequest);
router.delete("/request/:id/delete", adminController.deleteRequest);

// Repost post
// post/repost
router.post("/post/repost", adminController.postRepost);

router.delete("/user/:id/delete", adminController.deleteUser);

// system
router.post("/system/find", adminController.system);

router.post("/system/on", adminController.systemOn);

router.post("/system/off", adminController.systemOff);

// system
router.post("/visit/find", adminController.getVisit);

router.post("/visit", adminController.postVisit);

module.exports = router;
