import { useEffect, useState } from "react";
import TweetsController from "../../api/tweets";
import useApi from "../../hooks/useApi";
import useToken from "../../hooks/useToken";
import { TbBrandTwitter } from "react-icons/tb";
import { MdOutlineFileUpload } from "react-icons/md";
import { useTheme } from "../../hooks/ThemeContext";

const PostTweet = ({ setTweets }) => {
  const { isDarkMode } = useTheme();
  const { localUsername } = useToken();

  const [tweetText, setTweetText] = useState("");

  const [file, setFile] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  const previewFileImage = (uploadedFile) => {
    const reader = new FileReader();
    reader.readAsDataURL(uploadedFile);

    reader.onloadend = () => {
      setImage(reader.result);
    };
    // console.log(image, "image");
  };

  const handleFileChange = (e) => {
    // e.preventDefault()
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    previewFileImage(uploadedFile);
  };

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
        image: image,
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
      setImage("");
      setError("");
      setTweets((prev) => [postTweetsData, ...prev]);
      console.log(postTweetsData, "postTweetsData!");
    } else if (postNetworkError || postError) {
      console.log("Network Error!");
      setError("Image large!");
    }
  }, [
    error,
    setTweets,
    setTweetText,
    postError,
    postLoading,
    postNetworkError,
    postTweetsData,
    postTweetsResp,
  ]);

  return (
    <>
      <div
        className={`${
          isDarkMode
            ? "bg-gray-800 text-white border-gray-600"
            : "bg-white text-black"
        } border rounded p-4 mb-4`}
      >
        <div className="flex flex-row items-center  space-x-2 mb-2">
          <img
            src={`https://avatars.dicebear.com/api/identicon/${localUsername}.svg`}
            alt={localUsername}
            className="w-8 h-8 rounded-full"
          />
          <div className="text-xl font-semibold">Post a Tweet</div>
        </div>
        <textarea
          className={`${
            isDarkMode
              ? "bg-gray-800 text-white border-gray-600"
              : "bg-white text-black"
          } w-full p-2 border rounded mb-2`}
          rows="3"
          value={tweetText}
          onChange={(e) => setTweetText(e.target.value)}
          placeholder="What's happening?"
        />
        {error.length > 0 && <div className="text-red-400">{error}</div>}
        {image && (
          <div className="px-2 md:px-10 w-full h-fit max-h-[50vh] rounded-lg overflow-auto mb-2 snap-center">
            <img src={image} alt="image" className="rounded-lg" />
          </div>
        )}

        <div className="flex justify-betweeb">
          <label
            htmlFor="file"
            className={`${
              isDarkMode ? "bg-gray-700" : "bg-gray-200"
            } hover:cursor-pointer p-2 rounded-full flex justify-center items-center`}
            // onClick={handleFileChange}
          >
            <MdOutlineFileUpload size={25} />
            <input
              onChange={handleFileChange}
              type="file"
              id="file"
              name="file"
              className="hidden"
              accept=".jpg, .jpeg, .png, .webp, .svg, .ico, .jfif"
            />
          </label>
          <button
            onClick={handlePost}
            className={`ml-auto flex flex-row items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-full ${
              tweetText <= 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={tweetText <= 0}
          >
            <TbBrandTwitter />
            <span>Tweet Now</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default PostTweet;
