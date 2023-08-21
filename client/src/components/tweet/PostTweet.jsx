import { useEffect, useState } from "react";
import TweetsController from "../../api/tweets";
import useApi from "../../hooks/useApi";
import useToken from "../../hooks/useToken";
import { TbBrandTwitter } from "react-icons/tb";

const PostTweet = ({ onPost }) => {
  const [tweetText, setTweetText] = useState("");
  const { localUsername } = useToken();
  const {
    res: postTweetsResp,
    data: postTweetsData,
    error: postError,
    loading: postLoading,
    networkError: postNetworkError,
    request: postTweet,
  } = useApi(TweetsController.postTweet);

  const handlePost = async () => {
    try {
      await postTweet({
        username: localUsername,
        tweet_message: tweetText,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (
      !postNetworkError &&
      !postError &&
      postTweetsResp &&
      postTweetsData &&
      !postLoading
    ) {
      setTweetText("");
      onPost(true);
    } else if (postNetworkError) {
      console.log("Network Error!");
    }
    // else {
    //   console.log(postTweetsData?.message, "message");
    // }
  }, [
    onPost,
    setTweetText,
    postError,
    postLoading,
    postNetworkError,
    postTweetsData,
    postTweetsResp,
  ]);

  return (
    <>
      <div className="bg-white border rounded p-4 mb-4">
        <div className="flex flex-row items-center  space-x-2 mb-2">
          <img
            src={`https://avatars.dicebear.com/api/identicon/${localUsername}.svg`}
            alt={localUsername}
            className="w-8 h-8 rounded-full"
          />
          <div className="text-xl font-semibold">Post a Tweet</div>
        </div>
        <textarea
          className="w-full p-2 border rounded mb-2"
          rows="3"
          value={tweetText}
          onChange={(e) => setTweetText(e.target.value)}
          placeholder="What's happening?"
        />
        <button
          onClick={handlePost}
          className={`ml-auto flex flex-row items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-full ${
            tweetText <= 0 ? "opacity-70 cursor-not-allowed" : ""
          }`}
          disabled={tweetText <= 0}
        >
          <TbBrandTwitter />
          <span>Tweet Now</span>
        </button>
      </div>
    </>
  );
};

export default PostTweet;
