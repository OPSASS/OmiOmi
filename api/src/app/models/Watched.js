const mongoose = require("mongoose");

const WatchedSchema = new mongoose.Schema(
  {
    targetId: {
      type: String,
    },
    userId: {
      type: String,
      required: true,
    },
    watched: {
      type: Boolean,
      default: true,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Watched = mongoose.model("Watched", WatchedSchema);

module.exports.Watched = Watched;
