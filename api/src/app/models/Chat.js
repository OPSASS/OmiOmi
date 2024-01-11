const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    membersId: {
      type: Array,
      require: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

ChatSchema.virtual("userData", {
  ref: "User",
  localField: "membersId",
  foreignField: "_id",
});

ChatSchema.virtual("latestData", {
  ref: "Message",
  localField: "_id",
  foreignField: "chatId",
  justOne: true,
});

ChatSchema.index({ title: "text" });

const Chat = mongoose.model("Chat", ChatSchema);

module.exports.Chat = Chat;
