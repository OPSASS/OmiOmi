const express = require("express");
const router = express.Router();

// Add Route
const ShortsController = require("../app/controllers/ShortsController");
// Shorts
// POST /shorts
router.post("/", ShortsController.createShorts);

// Get a shorts
// GET /shorts/:id
router.post("/find", ShortsController.findShorts);

// Get a shorts
// GET /shorts/:id
router.get("/:id", ShortsController.getShortDetail);

// Update Submit POST Route
// PUT /shorts/:id
router.put("/:id", ShortsController.updateShorts);

// Delete Shorts
// DELETE /shorts/:id
router.delete("/:id", ShortsController.deleteShorts);

module.exports = router;
