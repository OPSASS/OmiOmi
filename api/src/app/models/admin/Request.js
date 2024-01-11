const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    expireAt: { type: Date, expireAfterSeconds: 6000 },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
RequestSchema.virtual("userData", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
  justOne: true,
});
const Request = mongoose.model("Request", RequestSchema);

module.exports.Request = Request;
