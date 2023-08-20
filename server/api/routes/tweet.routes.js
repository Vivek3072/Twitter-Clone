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

router.get("/", validateToken, getTweets);
router.get("/:username", validateToken, getMyTweets);
router.post("/create", validateToken, createTweet);
router.put("/:id", validateToken, updateTweet);
router.delete("/:id", validateToken, deleteTweet);

module.exports = router;
