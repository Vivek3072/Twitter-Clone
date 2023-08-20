const Tweet = require("../../models/TweetModel");

class TweetController {
  static async getTweets(req, res) {
    try {
      const tweets = await Tweet.find();
      res.status(200).json({ tweets });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getMyTweets(req, res) {
    try {
      const { username } = req.params;
      const tweets = await Tweet.find({ username: username });
      res.status(200).json({ tweets });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  static async createTweet(req, res) {
    try {
      const { username, tweet_message } = req.body;
      if (!username || !tweet_message)
        res.send(500).json({ message: "All fields mandatory!" });
      // Create a new tweet
      const newTweet = new Tweet({
        username,
        tweet_message,
      });

      await newTweet.save();
      res.status(500).json({ message: "Tweeted Succesfully!" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async updateTweet(req, res) {
    try {
      const { username, tweet_message } = req.body;
      if (!username || !tweet_message)
        return res
          .status(400)
          .json({ message: "Please provide both username and tweet_message." });

      const updatedTweet = await Tweet.findOneAndUpdate(
        { username: username },
        { $set: { tweet_message: tweet_message } },
        { new: true }
      );

      if (!updatedTweet)
        return res
          .status(404)
          .json({ message: "Tweet not found for the provided username." });

      await updatedTweet.save();

      res.json({ message: "Tweet updated successfully.", tweet: updatedTweet });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async deleteTweet(req, res) {
    try {
      const { id } = req.params;

      if (!id)
        return res
          .status(400)
          .json({ message: "Please provide both username and tweet_message." });

      const deletedTweet = await Tweet.findOneAndDelete({
        _id: id,
      });

      if (!deletedTweet)
        return res.status(404).json({
          message:
            "Tweet not found for the provided username and tweet_message.",
        });

      res.json({ message: "Tweet deleted successfully." });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = TweetController;
