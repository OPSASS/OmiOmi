const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    targetId: {
      type: String,
    },
    parentId: {
      type: String,
      default: null,
    },
    userId: {
      type: String,
    },
    text: {
      type: String,
    },
    interactionId: {
      type: String,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

CommentSchema.virtual("userData", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
  justOne: true,
});

CommentSchema.virtual("interactionData", {
  ref: "Interaction",
  localField: "interactionId",
  foreignField: "_id",
  justOne: true,
});

CommentSchema.virtual("childData", {
  ref: "Comment",
  localField: "_id",
  foreignField: "parentId",
  limit: 3,
});

CommentSchema.virtual("countChild", {
  ref: "Comment",
  localField: "_id",
  foreignField: "parentId",
  count: true,
});

CommentSchema.pre("find", function () {
  this.populate([
    { path: "childData" },
    { path: "userData", select: "fullname avtPicture" },
    { path: "countChild" },
    { path: "interactionData" },
  ]);
});

const Comment = mongoose.model("Comment", CommentSchema);
module.exports.Comment = Comment;
