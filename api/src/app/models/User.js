const mongoose = require("mongoose");

// User Schema
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
      min: 3,
      max: 30,
    },
    lastName: {
      type: String,
      require: true,
      min: 3,
      max: 30,
    },
    fullname: {
      type: String,
      require: true,
      min: 6,
      max: 60,
    },
    nickname: {
      type: String,
      require: true,
      min: 3,
      max: 30,
    },
    username: {
      type: String,
      require: true,
      unique: true,
      min: 3,
      max: 30,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      min: 3,
      max: 30,
    },
    password: {
      type: String,
      require: true,
      min: 6,
    },
    gender: {
      type: String,
      require: true,
    },
    birthday: {
      type: Date,
      require: true,
    },

    avtPicture: {
      type: String,
      default: "",
    },
    bgPicture: {
      type: String,
      default: "",
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
    city: {
      type: String,
      default: "",
    },
    infor: {
      type: String,
      default: "",
    },

    relationshipsId: {
      type: String,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

UserSchema.virtual("relationshipsData", {
  ref: "Relationships",
  localField: "relationshipsId",
  foreignField: "_id",
  justOne: true,
});

const User = mongoose.model("User", UserSchema);
module.exports.User = User;
