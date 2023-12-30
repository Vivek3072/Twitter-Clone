const mongoose = require("mongoose");

const tweetSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    // ref: "User", // Reference to the User model
  },
  profilePic: {
    type: String,
    required: true,
  },
  tweet_message: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: [String],
    default: [],
  },
  isEdited: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const Tweet = mongoose.model("Tweet", tweetSchema);

module.exports = Tweet;
