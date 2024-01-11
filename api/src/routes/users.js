const router = require("express").Router();
const userController = require("../app/controllers/UserController");

// [GET]
//chon user
// /user/:id
router.get("/:id", userController.getUserDetail);

router.get("/:nickname/nickname", userController.getUserByNickname);

router.post("/find", userController.findUser);

// [PUT]
// cap nhat thong tin user
// /user/:id
router.put("/:id", userController.updateUser);

// [DELETE]
// xoa user
// /user/:id/delete
router.post("/:id/delete", userController.deleteUser);

module.exports = router;
