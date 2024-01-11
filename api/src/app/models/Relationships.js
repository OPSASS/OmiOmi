const mongoose = require("mongoose");

// Relationships Schema
const RelationshipsSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    postHiddeds: {
      type: Array,
      default: [],
    },
    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    blocks: {
      type: Array,
      default: [],
    },
    chatDeletes: {
      type: Array,
      default: [],
    },
    chatHiddens: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);
const Relationships = mongoose.model("Relationships", RelationshipsSchema);

module.exports.Relationships = Relationships;
