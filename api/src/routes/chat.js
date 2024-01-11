const router = require("express").Router();
const ChatController = require("../app/controllers/ChatController");

// create chat new
// /chat
router.post("/", ChatController.createChat);

// get All chat member
// /chat/find
router.post("/find", ChatController.findChat);

router.put("/:id", ChatController.updateChat);

router.delete("/:id", ChatController.removeChat);

// get chat Detail
// /chat/:userId
router.get("/:id", ChatController.getChatDetail);

module.exports = router;
