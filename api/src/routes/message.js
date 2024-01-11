const router = require("express").Router();
const MessageController = require("../app/controllers/MessageController");

// send chat
// /message
router.post("/", MessageController.createMessage);

router.put("/:id", MessageController.updateMessage);

// get chat user
// /message/find
router.post("/find", MessageController.findMessage);

// get chat member
// /message/:id
router.get("/:id", MessageController.getDetail);

module.exports = router;
