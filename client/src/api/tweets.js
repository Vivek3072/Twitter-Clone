import client from "./client";

export default class TweetsController {
  static async getTweets() {
    const tweets = await client.get("/tweets");
    return tweets;
  }
  static async getMyTweets(user) {
    const tweets = await client.get(`/tweets&user=${user}`);
    return tweets;
  }
}
 