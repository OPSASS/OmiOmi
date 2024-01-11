const mongoose = require("mongoose");

// Shorts Schema
const ShortsSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    music: {
      type: String,
    },
    files: {
      type: Array,
      required: true,
    },
    interactionId: {
      type: String,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

ShortsSchema.virtual("userData", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
  justOne: true,
});

ShortsSchema.virtual("interactionData", {
  ref: "Interaction",
  localField: "interactionId",
  foreignField: "_id",
  justOne: true,
});

ShortsSchema.virtual("countComment", {
  ref: "Comment",
  localField: "_id",
  foreignField: "targetId",
  count: true,
});
const Shorts = mongoose.model("Shorts", ShortsSchema);

module.exports.Shorts = Shorts;
