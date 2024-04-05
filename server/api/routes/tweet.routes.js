const express = require("express");
const router = express.Router();

const {
  createTweet,
  getTweets,
  // getPaginatedTweets,
  getMyTweets,
  updateTweet,
  deleteTweet,
  likeTweet,
  getIndivTweet,
} = require("../controllers/TweetController");
const validateToken = require("../../middlewares/ValidateToken");
// const paginatedResults = require("../../middlewares/paginatedResults");
// const Tweet = require("../../models/TweetModel");

router.get("/", validateToken, getTweets);
// router.get("/", validateToken, paginatesResults(Tweet), getPaginatedTweets); // THe paginatedResult middleware is applied on this rpute and it updates the response with the data fetched from the passed model and returns the paginated result based on the page and limit provided
router.get("/:username", validateToken, getMyTweets);
router.post("/create", validateToken, createTweet);
router.post("/like", validateToken, likeTweet);
router.put("/", validateToken, updateTweet);
router.get("/tweet/:id", validateToken, getIndivTweet); // to get any tweet with its ID and show it or frontend as individual tweet
router.delete("/:id", validateToken, deleteTweet);

module.exports = router;
