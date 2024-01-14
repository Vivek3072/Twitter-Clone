import { useState, useEffect } from "react";
import useApi from "../../hooks/useApi";
import TweetController from "../controllers/tweets";

const useUserApi = () => {
  const [indivTweet, setIndivTweet] = useState([]);

  const {
    res: indivTweetRes,
    data: indivTweetData,
    error,
    loading,
    networkError,
    request: getIndivTweet,
  } = useApi(TweetController.getIndivTweet);

  const getIndividualTweet = async (id) => {
    try {
      await getIndivTweet(id);
    } catch (error) {
      console.error("Error fetching tweet:", error);
    }
  };

  //   useEffect(() => {
  //     getIndividualTweet(search);
  //   }, [search]);

  useEffect(() => {
    if (
      !networkError &&
      !error &&
      indivTweetData &&
      indivTweetRes &&
      !loading
    ) {
      console.log(indivTweetData, "data");
      setIndivTweet(indivTweetData);
    }
  }, [error, loading, networkError, indivTweetData, indivTweetRes]);

  return {
    indivTweet,
    loading,
    error,
    networkError,
    getIndividualTweet,
  };
};

export default useUserApi;
