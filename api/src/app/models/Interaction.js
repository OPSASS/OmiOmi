const mongoose = require("mongoose");

// Interaction Schema
const InteractionSchema = mongoose.Schema(
  {
    targetId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    favorites: {
      type: Array,
    },
    comments: {
      type: Array,
    },
    shares: {
      type: Array,
    },
    shares: {
      type: Array,
    },
    emotions: {
      type: Array,
    },
    recalls: {
      type: Array,
    },
    deletes: {
      type: Array,
    },
  },
  { timestamps: true }
);
const Interaction = mongoose.model("Interaction", InteractionSchema);

module.exports.Interaction = Interaction;
