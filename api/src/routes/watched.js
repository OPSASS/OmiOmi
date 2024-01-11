const router = require("express").Router();
const WatchedController = require("../app/controllers/WatchedController");

router.post("/:id", WatchedController.createWatched);

router.post("/:id/update", WatchedController.updateWatchedDetail);

router.get("/:id", WatchedController.getWatchedUser);

module.exports = router;
