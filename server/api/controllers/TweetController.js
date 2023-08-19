const Tweet = require("../../models/TweetModel");

class PaymentController {
  static async getTweets(req, res) {
    try {
      const tweets = await Tweet.find();
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
      res.send(500).json({ message: "Tweeted Succesfully!" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = PaymentController;
