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

  const getAllTweets = async () => {
    try {
      await getTweets();
      // console.log(res.data.tweets, "data");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllTweets();
    // getMyTweets();
  }, []);

  useEffect(() => {
    if (!networkError && !error && allTweetsResp && allTweetsData && !loading) {
      // console.log(allTweetsResp, allTweetsData, "allTweetsData");
      setTweets(allTweetsData.tweets);
    }
  }, [error, loading, networkError, allTweetsData, allTweetsResp]);

  // const getMyTweets = async (user) => {
  //   try {
  //     const res = await TweetsController.getMyTweets(user);
  //     console.log(res.data.tweets, "data");
  //     setMyTweets(res.data.tweets);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div className="flex h-screen overflow-auto">
      <div className="flex-grow p-4">
        <PostTweet setTweets={setTweets} />
        <div className="flex flex-row justify-between border-b w-full my-3">
          <div
            className="text-center text-lg
           font-medium text-blue-500 p-2 w-full border-b-2 border-blue-500 hover:cursor-pointer"
          >
            Timeline
          </div>
          <div className="text-center text-lg font-medium hover:text-blue-500 p-2 w-full border-b-2  hover:border-blue-500 hover:cursor-pointer">
            My Tweets
          </div>
        </div>
        {tweets && !loading ? (
          tweets?.map((tweet, idx) => (
            <TweetCard
              key={idx}
              tweet={tweet}
              tweets={tweets}
              setTweets={setTweets}
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
