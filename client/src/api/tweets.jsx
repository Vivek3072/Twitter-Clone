import axios from "axios";

let BaseURL = "http://localhost:5001/api/tweets";
// let BaseURL = "https://twitter-clone-backend-5jet.onrender.com/api/tweets";

export default class TweetsController {
  static async getTweets() {
    const tweets = await axios.get(`${BaseURL}`);
    return tweets;
  }
  static async getMyTweets(user) {
    const tweets = await axios.get(`${BaseURL}&user=${user}`);
    // console.log(data, "data");
    return tweets;
  }
}
