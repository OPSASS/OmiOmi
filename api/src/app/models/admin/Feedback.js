const mongoose = require("mongoose");

// Feedback Schema
const FeedbackSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    text: {
      type: String,
      default: "",
    },
    stars: {
      type: Number,
      default: 5,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

FeedbackSchema.virtual("userData", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
  justOne: true,
});
const Feedback = mongoose.model("Feedback", FeedbackSchema);
module.exports.Feedback = Feedback;
