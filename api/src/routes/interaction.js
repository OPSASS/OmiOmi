const express = require("express");
const router = express.Router();

// Add Route
const InteractionController = require("../app/controllers/InteractionController");
// Interaction
// Interaction /interaction
router.post("/", InteractionController.createInteraction);

// Get a Interaction
// GET /interaction/:id
router.get("/:id", InteractionController.getInteractionDetail);

// find Interaction
// GET /interaction/find
router.post("/find", InteractionController.findInteraction);

// Update Interaction
// PUT /interaction/:id
router.put("/:id", InteractionController.updateInteraction);

// Delete Interaction
// DELETE /interaction/:id
router.delete("/:id", InteractionController.deleteInteraction);

module.exports = router;
