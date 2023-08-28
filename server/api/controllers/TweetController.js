const ErrorRespond = require("../../helpers/ErrorRespond");
const Tweet = require("../../models/TweetModel");
const cloudinary = require("../../config/cloudinary");

class TweetController {
  static async getTweets(req, res) {
    try {
      const tweets = await Tweet.find().sort({ createdAt: -1 });
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
      const { username, tweet_message, image } = req.body;
      if (!username || !tweet_message)
        res.status(500).send({ message: "All fields mandatory!" });

      let uploadedImage = "";
      if (image) {
        uploadedImage =
          (await cloudinary.uploader.upload(
            image,
            {
              quality: "auto",
              folder: "User_Tweets",
              allowed_formats: [
                "png",
                "jpg",
                "jpeg",
                "webp",
                "svg",
                "ico",
                "jfif",
              ],
            },
            function (error, result) {
              if (error) {
                console.log(error, "CLOUDINARY ERROR");
                return ErrorRespond(res, 400, "Image too large!");
              }
              // console.log(result);
            }
          )) || "";
      }

      // Create a new tweet
      const newTweet = new Tweet({
        username,
        tweet_message,
        image: uploadedImage.secure_url,
      });

      await newTweet.save();
      res.status(200).json(newTweet);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async likeTweet(req, res) {
    try {
      const { tweet_id } = req.body;

      if (!tweet_id) {
        return ErrorRespond(res, 400, "Please provide tweet ID!");
      }

      const tweet = await Tweet.findById(tweet_id);
      if (!tweet) {
        return ErrorRespond(res, 404, "Tweet not found or deleted!");
      }

      const currentUserUsername = req.user.username;

      if (tweet.likes.includes(currentUserUsername)) {
        return ErrorRespond(res, 400, "You've already liked this tweet!");
      }

      tweet.likes.push(currentUserUsername);
      tweet.save();

      return res.status(200).json({ tweet });
    } catch (err) {
      console.error(err);
      return ErrorRespond(res, 500, "Internal server error");
    }
  }

  static async updateTweet(req, res) {
    try {
      const { tweet_id, tweet_message } = req.body;
      if (!tweet_id || !tweet_message)
        return ErrorRespond(
          res,
          400,
          "Please provide both tweet_id and tweet_message."
        );

      const updatedTweet = await Tweet.findByIdAndUpdate(
        tweet_id,
        { $set: { tweet_message: tweet_message, isEdited: true } },
        { new: true }
      );
      if (!updatedTweet)
        return res
          .status(404)
          .json({ message: "Tweet not found for the provided username." });

      await updatedTweet.save();

      res.status(200).send(updatedTweet);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async deleteTweet(req, res) {
    try {
      const tweet_id = req.params.id;
      if (!tweet_id) return ErrorRespond(res, 400, "Please provide tweet_id");

      const tweet = await Tweet.findById(tweet_id);
      if (!tweet) {
        return ErrorRespond(res, 404, "Tweet Not Found!");
      }

      const deletedTweet = await Tweet.findByIdAndDelete(tweet_id);

      if (!deletedTweet)
        return res.status(404).json({
          message: "Tweet not found for the provided ID.",
        });

      res.status(200).send(deletedTweet);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = TweetController;
