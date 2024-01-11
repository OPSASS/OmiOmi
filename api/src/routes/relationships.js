const express = require("express");
const router = express.Router();

// Add Route
const RelationshipsController = require("../app/controllers/RelationshipsController");
// Relationships
// Relationships /relationships
router.post("/", RelationshipsController.createRelationships);

// Get a Relationships
// GET /relationships/:id
router.get("/:id", RelationshipsController.getRelationshipsDetail);

// find Relationships
// GET /relationships/find
router.post("/find", RelationshipsController.findRelationships);

// Update Relationships
// PUT /relationships/:id
router.put("/:id", RelationshipsController.updateRelationships);

// Delete Relationships
// DELETE /relationships/:id
router.delete("/:id", RelationshipsController.deleteRelationships);

module.exports = router;
