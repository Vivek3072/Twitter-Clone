import { useContext, useEffect, useState } from "react";
import { FaEdit, FaTrash, FaRegHeart } from "react-icons/fa";
import { MdShare } from "react-icons/md";
// import AuthController from "../../api/auth";
import useApi from "../../hooks/useApi";
import useToken from "../../hooks/useToken";
import TweetsController from "../../api/controllers/tweets";
import Toast from "../utils/Toast";
import UserContext from "../../hooks/UserContext";
import { useTheme } from "../../hooks/ThemeContext";

const TweetCard = ({ tweet, tweets, setTweets }) => {
  const { isDarkMode } = useTheme();
  const { userData } = useContext(UserContext);
  // console.log(tweets,"tweets");

  const {
    _id: tweet_id,
    username,
    image: uploadedImgUrl,
    createdAt,
    tweet_message,
    likes,
    profilePic,
  } = tweet;

  let postLikes = likes.length;

  const formattedDate = createdAt && new Date(createdAt);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDateString = formattedDate.toLocaleDateString(
    undefined,
    options
  );
  const formattedTimeString = formattedDate.toLocaleTimeString();

  const [toast, setToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("Operation Successful!");

  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(tweet_message);
  const { localUsername } = useToken();

  // THIS SECTION EDITS THE TWEET MESSAGE TAKING TWEET_ID AND tweet_message
  const {
    res: editTweetsResp,
    data: editTweetsData,
    error: editError,
    loading: editLoading,
    networkError: editNetworkError,
    request: editTweet,
  } = useApi(TweetsController.editTweet);

  const updateThetweet = async (id, message) => {
    try {
      const updatedTweets = tweets?.map((item) => {
        if (item._id === id) return { ...item, tweet_message: message };
        return item;
      });
      console.log(updatedTweets, "updatedTweets");
      setTweets(updatedTweets);
      editTweet({
        tweet_id: id,
        tweet_message: message,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (
      !editNetworkError &&
      !editError &&
      editTweetsData &&
      editTweetsResp &&
      !editLoading
    ) {
      setIsEditing(false);
      setToast(true);
      setToastMsg("Tweet edited!");
      console.log(editTweetsData, "editTweetsData");
    }
  }, [
    editError,
    editLoading,
    editNetworkError,
    editTweetsData,
    editTweetsResp,
  ]);

  const handleEditBox = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedText(tweet_message);
  };
  // THE EDIT TWEET SECTION's LOGIC ENDS HERE

  // THIS SECTION DELETES THE TWEET
  const {
    res: deleteTweetsResp,
    data: deleteTweetsData,
    error: deleteError,
    loading: deleteLoading,
    networkError: deleteNetworkError,
    request: deleteTweet,
  } = useApi(TweetsController.deleteTweet);

  const handleDelete = async (tweet_id) => {
    try {
      const updatedTweets = tweets?.filter((item) => item._id !== tweet_id);

      console.log(updatedTweets, "updatedTweets inside handleDelete");
      setTweets(updatedTweets);
      deleteTweet(tweet_id);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (
      !deleteNetworkError &&
      !deleteError &&
      deleteTweetsData &&
      deleteTweetsResp &&
      !deleteLoading
    ) {
      console.log(deleteTweetsData, "DELETEDDATA");
      // setTweets(deleteTweetsData);
      setToast(true);
      setToastMsg("Tweet deleted successfully!");
    }
  }, [
    deleteError,
    deleteLoading,
    deleteNetworkError,
    deleteTweetsData,
    deleteTweetsResp,
    setTweets,
  ]);
  // THE DELETE TWEET SECTION's LOGIC ENDS HERE

  // THIS SECTIONS HANDLES THE LOGIC WHEN A USER FOLLOWS ANOTHER USER
  // const {
  //   res: followResp,
  //   data: followData,
  //   error: followError,
  //   loading,
  //   networkError,
  //   request: followUserReq,
  // } = useApi(AuthController.followUserReq);

  // const handleFollowUser = async (e) => {
  //   console.log(localUsername, user, "Handlefollow");
  //   e.preventDefault();
  //   try {
  //     await followUserReq({
  //       username: localUsername,
  //       followUser: user,
  //     });
  //   } catch (err) {
  //     console.log(err, "Err register");
  //   }
  // };

  // useEffect(() => {
  //   if (!networkError && !followError && followData && followResp && !loading) {
  //     console.log(followData, followResp, "register page");
  //     window.location.reload;
  //   } else {
  //     console.log(followData?.message, "message");
  //   }
  // }, [followError, loading, networkError, followResp, followData]);

  const copyTweetLink = (id) => {
    setToast(true);
    setToastMsg("Link copied to clipboard!");
    navigator.clipboard.writeText(
      // `http://localhost:5173/tweet/${id}`
      `https://twitter-clone-zwb6.onrender.com/tweet/${id}`
    );
  };

  return (
    <>
      <div
        className={`${
          isDarkMode
            ? "bg-gray-800 text-white border-gray-600"
            : "bg-white text-black border-gray-100"
        } shadow-sm border  rounded-md p-3 mb-3 hover:shadow-md`}
      >
        <div className="flex flex-row items-center justify-between mb-2">
          <div className="flex flex-row">
            <img
              src={profilePic}
              alt={`User ${username}`}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div className="flex flex-col justify-start">
              <div className="text-lg font-medium">{`@${username}`}</div>
              {userData?.following?.find(
                (data) => data.username === username
              ) ? (
                <div className="text-blue-500 text-xs rounded md:ml-2">
                  Following
                </div>
              ) : (
                <div className="text-gray-400 text-xs rounded md:ml-2">
                  Not Following
                </div>
              )}
            </div>
          </div>
          <div className="md:mx-2 my-auto text-sm text-gray-500 w-fit order-last flex flex-wrap justify-end">
            <span className="text-xs">{formattedDateString}-</span>
            <span className="text-xs">{formattedTimeString}</span>
          </div>
        </div>
        {isEditing ? (
          <textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className={`${
              isDarkMode ? "bg-gray-800" : "bg-white"
            } border border-gray-400 pl-2 py-1 w-full mb-2`}
          />
        ) : (
          <div className="py-2">
            {tweet_message}

            {tweet?.isEdited && (
              <span className="text-gray-400 italic text-xs mx-1">edited</span>
            )}
          </div>
        )}
        {uploadedImgUrl && (
          <div className="flex items-center justify-center bg-gray-500 bg-opacity-10 px-2 md:px-10 w-full h-fit max-h-[50vh] rounded-lg overflow-auto mb-2 snap-center">
            <img
              src={uploadedImgUrl}
              alt="tweet_image"
              className="rounded-lg"
            />
          </div>
        )}
        <div className="border-t border-gray-400 p-2 flex justify-between items-center">
          <div className="flex space-x-4 text-gray-600">
            <div className="flex items-center space-x-1 cursor-pointer font-medium hover:text-blue-500">
              <FaRegHeart />
              <span>{postLikes}</span>
            </div>
            <div
              className="flex items-center space-x-1 cursor-pointer font-medium hover:text-green-500"
              onClick={() => copyTweetLink(tweet_id)}
            >
              <MdShare />
              <span>12</span>
            </div>
          </div>
          {isEditing ? (
            <div>
              <button
                onClick={() => updateThetweet(tweet_id, editedText)}
                className="bg-green-500 text-white px-2 py-1 rounded mr-2"
              >
                Save
              </button>
              <button
                onClick={handleCancelEdit}
                className="bg-gray-300 text-gray-600 px-2 py-1 rounded"
              >
                Cancel
              </button>
            </div>
          ) : (
            localUsername === username && (
              <>
                <div className="flex space-x-4">
                  <div
                    className="flex items-center space-x-1 cursor-pointer text-gray-500 hover:text-orange-500"
                    onClick={handleEditBox}
                  >
                    <FaEdit />
                    <p>Edit</p>
                  </div>
                  <div
                    className="flex items-center space-x-1 cursor-pointer text-gray-500 hover:text-red-500"
                    onClick={() => handleDelete(tweet_id)}
                  >
                    <FaTrash />
                    <p>Delete</p>
                  </div>
                </div>
              </>
            )
          )}
        </div>
      </div>
      {toast && <Toast message={toastMsg} type="success" />}
    </>
  );
};

export default TweetCard;
