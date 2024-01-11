const mongoose = require("mongoose");

const VisitSchema = new mongoose.Schema(
  {
    ip: { type: String, require: true },
    timestamp: { type: Date },
  },
  { timestamps: true }
);

const Visit = mongoose.model("Visit", VisitSchema);

module.exports.Visit = Visit;
