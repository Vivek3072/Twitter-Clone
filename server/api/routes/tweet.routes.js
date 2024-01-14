const express = require("express");
const router = express.Router();

const {
  createTweet,
  getTweets,
  getMyTweets,
  updateTweet,
  deleteTweet,
  likeTweet,
  getIndivTweet,
} = require("../controllers/TweetController");
const validateToken = require("../../middlewares/ValidateToken");

router.get("/", validateToken, getTweets);
router.get("/:username", validateToken, getMyTweets);
router.post("/create", validateToken, createTweet);
router.post("/like", validateToken, likeTweet);
router.put("/", validateToken, updateTweet);
router.get("/tweet/:id", validateToken, getIndivTweet); // to get any tweet with its ID and show it or frontend as individual tweet
router.delete("/:id", validateToken, deleteTweet);

module.exports = router;
