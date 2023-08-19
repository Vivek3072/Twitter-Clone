import { useState } from "react";

const PostTweet = ({ onPost }) => {
  const [tweetText, setTweetText] = useState("");
  
  const handlePost = () => {
    if (tweetText.trim() !== "") {
      onPost(tweetText);
      setTweetText("");
    }
  };

  return (
    <>
      <div className="bg-white border rounded p-4 mb-4">
        <h2 className="text-xl font-semibold mb-2">Post a Tweet</h2>
        <textarea
          className="w-full p-2 border rounded mb-2"
          rows="3"
          value={tweetText}
          onChange={(e) => setTweetText(e.target.value)}
          placeholder="What's happening?"
        />
        <button
          onClick={handlePost}
          className="bg-blue-500 text-white px-4 py-2 rounded-full"
        >
          Post
        </button>
      </div>
    </>
  );
};

export default PostTweet;
