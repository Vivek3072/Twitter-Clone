const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add the user name"],
      unique: [true, "Username already taken"],
    },
    email: {
      type: String,
      required: [true, "Please add the user name"],
      unique: [true, "Username already taken"],
    },
    password: {
      type: String,
      required: [true, "Please add the user password"],
    },
    following: [
      {
        username: {
          type: String,
          unique: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
