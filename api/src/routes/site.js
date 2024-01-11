const express = require("express");
const router = express.Router();

const siteController = require("../app/controllers/SiteController");

// [GET]
// wellcome to server
router.get("/", siteController.index);

// Search
// GET /search
router.get("/search/:key", siteController.searchKey);

router.post("/search/:key", siteController.searchOptions);

module.exports = router;
