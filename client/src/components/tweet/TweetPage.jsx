import { useEffect, useState } from "react";
import PostTweet from "./PostTweet";
import TweetCard from "./TweetCard";
import TweetsController from "../../api/tweets";
import useApi from "../../hooks/useApi";
import TweetCardLoader from "../loader/TweetCardLoader";

const TweetPage = () => {
  const [tweets, setTweets] = useState([]);
  // const [myTweets, setMyTweets] = useState([]);

  const {
    res: allTweetsResp,
    data: allTweetsData,
    error,
    loading,
    networkError,
    request: getTweets,
  } = useApi(TweetsController.getTweets);

  const handleEdit = (tweetId, newText) => {
    setTweets((prevTweets) =>
      prevTweets.map((tweet) =>
        tweet.id === tweetId ? { ...tweet, text: newText } : tweet
      )
    );
  };

  const handleDelete = (tweetId) => {
    setTweets((prevTweets) =>
      prevTweets.filter((tweet) => tweet.id !== tweetId)
    );
  };

  const handlePost = (newText) => {
    const newTweet = { id: Date.now(), text: newText };
    setTweets((prevTweets) => [...prevTweets, newTweet]);
  };

  const getAllTweets = async () => {
    try {
      await getTweets();
      // console.log(res.data.tweets, "data");
    } catch (err) {
      console.log(err);
    }
  };

  // const getMyTweets = async (user) => {
  //   try {
  //     const res = await TweetsController.getMyTweets(user);
  //     console.log(res.data.tweets, "data");
  //     setMyTweets(res.data.tweets);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    getAllTweets();
    // getMyTweets();
  }, []);

  useEffect(() => {
    if (!networkError && !error && allTweetsResp && allTweetsData && !loading) {
      console.log(allTweetsResp, allTweetsData, "allTweetsData");
      setTweets(allTweetsData.tweets);
    }
  }, [error, loading, networkError, allTweetsData, allTweetsResp]);
  return (
    <div className="flex h-screen overflow-auto">
      <div className="flex-grow p-4">
        <PostTweet onPost={handlePost} />
        <div className="flex flex-row justify-between w-full p-3">
          <div className="text-center font-medium text-blue-500 m-2 p-2 w-full border-b-2 border-blue-500">
            All Tweets
          </div>
          <div className="text-center font-medium text-blue-500 m-2 p-2 w-full border-b-2 border-blue-500">
            My Tweets
          </div>
        </div>
        {tweets && !loading ? (
          tweets.map((tweet, idx) => (
            <TweetCard
              key={idx}
              user={tweet.username}
              tweet={tweet.tweet_message}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <>
            <TweetCardLoader />
            <TweetCardLoader />
            <TweetCardLoader />
          </>
        )}
      </div>
    </div>
  );
};

export default TweetPage;
