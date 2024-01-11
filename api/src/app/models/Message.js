const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    chatId: {
      type: String,
      require: true,
    },
    parentId: {
      type: String,
    },
    userId: {
      type: String,
      require: true,
    },
    text: {
      type: String,
    },
    files: {
      type: Array,
      default: [],
    },
    type: {
      type: String,
      default: "text",
    },
    interactionId: {
      type: String,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

MessageSchema.virtual("interactionData", {
  ref: "Interaction",
  localField: "interactionId",
  foreignField: "_id",
  justOne: true,
});

MessageSchema.virtual("chatData", {
  ref: "Chat",
  localField: "chatId",
  foreignField: "_id",
  justOne: true,
});
const Message = mongoose.model("Message", MessageSchema);
module.exports.Message = Message;
