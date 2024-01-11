const mongoose = require("mongoose");

// Posts Schema
const PostsSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    interactionId: {
      type: String,
    },
    desc: {
      type: String,
      max: 3000,
      required: true,
    },
    images: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

PostsSchema.virtual("userData", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
  justOne: true,
});

PostsSchema.virtual("interactionData", {
  ref: "Interaction",
  localField: "interactionId",
  foreignField: "_id",
  justOne: true,
});

PostsSchema.virtual("countComment", {
  ref: "Comment",
  localField: "_id",
  foreignField: "targetId",
  count: true,
});

const Posts = mongoose.model("Posts", PostsSchema);

module.exports.Posts = Posts;
