import client from "../client";

export default class TweetsController {
  static async postTweet(data) {
    const tweet = await client.post("/tweets/create", data);
    return tweet;
  }
  static async getTweets() {
    const tweets = await client.get("/tweets");
    return tweets;
  }
  static async getIndivTweet(id) {
    const tweet = await client.get(`/tweets/tweet/${id}`);
    return tweet;
  }
  static async getMyTweets(user) {
    const tweets = await client.get(`/tweets&user=${user}`);
    return tweets;
  }
  static async editTweet(data) {
    const updatedTweet = await client.put("/tweets", data);
    return updatedTweet;
  }
  static async likeTweet(data) {
    const liked = await client.post("/tweets/like", data);
    return liked;
  }
  static async deleteTweet(tweet_id) {
    const deleted = await client.delete(`/tweets/${tweet_id}`);
    return deleted;
  }
}
