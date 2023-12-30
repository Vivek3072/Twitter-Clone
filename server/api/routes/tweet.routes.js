const express = require("express");
const router = express.Router();

const {
  createTweet,
  getTweets,
  getMyTweets,
  updateTweet,
  deleteTweet,
  likeTweet,
  updatePicture,
} = require("../controllers/TweetController");
const validateToken = require("../../middlewares/ValidateToken");

router.get("/", validateToken, getTweets);
router.get("/:username", validateToken, getMyTweets);
router.post("/create", validateToken, createTweet);
router.post("/update-picture", validateToken, updatePicture);
router.post("/like", validateToken, likeTweet);
router.put("/", validateToken, updateTweet);
router.delete("/:id", validateToken, deleteTweet);

module.exports = router;
