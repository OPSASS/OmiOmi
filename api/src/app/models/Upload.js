const mongoose = require("mongoose");

const UploadSchema = mongoose.Schema(
  {
    userId: {
      type: String,
    },
    url: [String],
    desc: { type: String },
    type: { type: String },
    targetId: { type: String },
  },
  { timestamps: true }
);

const Upload = mongoose.model("Image", UploadSchema);

module.exports.Upload = Upload;
