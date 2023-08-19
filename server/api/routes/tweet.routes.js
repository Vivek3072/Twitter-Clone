const express = require("express");
const router = express.Router();

const { createTweet, getTweets } = require("../controllers/TweetController");
const validateToken = require("../../middlewares/ValidateToken");

router.get("/", getTweets);
router.post("/create", createTweet);

module.exports = router;
