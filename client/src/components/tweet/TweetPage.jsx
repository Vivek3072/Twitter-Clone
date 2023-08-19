import { useState } from "react";
import PostTweet from "./PostTweet";
import TweetCard from "./TweetCard";

const TweetPage = () => {
  const [tweets, setTweets] = useState([
    { id: 1, text: "This is my first tweet!" },
    { id: 2, text: "This is my second tweet!" },
    { id: 3, text: "This is my first tweet!" },
    { id: 4, text: "This is my first tweet!" },
  ]);

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

  return (
    <div className="flex h-screen overflow-auto">
      <div className="flex-grow p-4">
        <PostTweet onPost={handlePost} />
        {tweets.map((tweet) => (
          <TweetCard
            key={tweet.id}
            tweet={tweet}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default TweetPage;
