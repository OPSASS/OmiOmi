const mongoose = require("mongoose");

// Repost Schema
const RepostSchema = new mongoose.Schema(
  {
    sendId: {
      type: String,
      default: "",
    },
    userId: {
      type: String,
    },
    postId: {
      type: String,
      default: "",
    },
    reason: {
      type: String,
      default: "",
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
RepostSchema.virtual("userData", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
  justOne: true,
});
const Repost = mongoose.model("Repost", RepostSchema);
module.exports.Repost = Repost;
