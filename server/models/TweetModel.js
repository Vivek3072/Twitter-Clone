const mongoose = require("mongoose");

const tweetSchema = new mongoose.Schema({
  username: {
    type: String,
    ref: "User", // Reference to the User model
  },
  tweet_message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Tweet = mongoose.model("Tweet", tweetSchema);

module.exports = Tweet;
