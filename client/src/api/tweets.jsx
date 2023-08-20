import axios from "axios";
import { BASE_URL } from "./BaseURL";

export default class TweetsController {
  static async getTweets() {
    const tweets = await axios.get(`${BASE_URL}/tweets`);
    return tweets;
  }
  static async getMyTweets(user) {
    const tweets = await axios.get(`${BASE_URL}/tweets&user=${user}`);
    // console.log(data, "data");
    return tweets;
  }
}
