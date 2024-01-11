const mongoose = require("mongoose");

// System Schema
const SystemSchema = mongoose.Schema(
  {
    maintenance: {
      type: String,
      default: false,
    },
  },
  { timestamps: true }
);

const System = mongoose.model("System", SystemSchema);
module.exports.System = System;
