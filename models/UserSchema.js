const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      trim: true,
    },

    verified: {
      type: Boolean,
      required: true,
    },

    profileImage: {
      data: Buffer,
      contentType: String,
    },

    aboutMe: {
      type: String,
    },

    university_Name: {
      type: String,
    },

    university_Id: {
      type: String,
    },

    department: {
      type: String,
    },

    phone: {
      type: String,
    },

    InformationCollected: {
      type: Boolean,
      required: true,
    },

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

const User = new mongoose.model("Client", UserSchema);

module.exports = {
  User,
};
