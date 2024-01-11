const mongoose = require("mongoose");

const NotificationsSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      ref: "User",
    },
    targetId: {
      type: String,
    },
    sendId: {
      type: String,
    },
    text: {
      type: String,
    },
    type: {
      type: String,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

NotificationsSchema.virtual("userData", {
  ref: "User",
  localField: "sendId",
  foreignField: "_id",
  justOne: true,
});

const Notifications = mongoose.model("Notifications", NotificationsSchema);

module.exports.Notifications = Notifications;
