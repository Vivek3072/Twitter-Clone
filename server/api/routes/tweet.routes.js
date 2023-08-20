const express = require("express");
const router = express.Router();

const {
  createTweet,
  getTweets,
  getMyTweets,
  updateTweet,
  deleteTweet,
} = require("../controllers/TweetController");
const validateToken = require("../../middlewares/ValidateToken");

router.get("/", getTweets);
router.get("/:username", getMyTweets);
router.post("/create", createTweet);
router.put("/:id", updateTweet);
router.delete("/:id", deleteTweet);

module.exports = router;
