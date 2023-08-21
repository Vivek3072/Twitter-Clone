import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaRegHeart } from "react-icons/fa";
import { MdShare } from "react-icons/md";
import AuthController from "../../api/auth";
import useApi from "../../hooks/useApi";
import useToken from "../../hooks/useToken";
import TweetsController from "../../api/tweets";
import Toast from "../utils/Toast";

const TweetCard = ({
  tweet_id,
  tweet_message,
  user,
  time,
  onEdit,
  onDelete,
}) => {
  const formattedDate = time && new Date(time);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDateString = formattedDate.toLocaleDateString(
    undefined,
    options
  );
  const formattedTimeString = formattedDate.toLocaleTimeString();

  const [toast, setToast] = useState(false);
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
      await editTweet({
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
      onEdit(true);
    }
  }, [
    onEdit,
    editedText,
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
      await deleteTweet(tweet_id);
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
      setToast(true);
      onDelete(true);
    }
  }, [
    onDelete,
    deleteError,
    deleteLoading,
    deleteNetworkError,
    deleteTweetsData,
    deleteTweetsResp,
  ]);
  // THE DELETE TWEET SECTION's LOGIC ENDS HERE

  // THIS SECTIONS HANDLES THE LOGIC WHEN A USER FOLLOWS ANOTHER USER
  const {
    res: followResp,
    data: followData,
    error: followError,
    loading,
    networkError,
    request: followUserReq,
  } = useApi(AuthController.followUserReq);

  const handleFollowUser = async (e) => {
    console.log(localUsername, user, "Handlefollow");
    e.preventDefault();
    try {
      await followUserReq({
        username: localUsername,
        followUser: user,
      });
    } catch (err) {
      console.log(err, "Err register");
    }
  };

  useEffect(() => {
    if (!networkError && !followError && followData && followResp && !loading) {
      console.log(followData, followResp, "register page");
      window.location.reload;
    } else {
      console.log(followData?.message, "message");
    }
  }, [followError, loading, networkError, followResp, followData]);

  return (
    <>
      <div className="bg-white shadow-sm border border-gray-100 rounded-md p-3 mb-3 hover:shadow-md">
        <div className="flex flex-row items-center justify-between mb-2">
          <div className="flex flex-row">
            <img
              src={`https://avatars.dicebear.com/api/identicon/${user}.svg`}
              alt={`User ${user}`}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div className="text-lg font-medium">{`@${user}`}</div>
            {localUsername !== user && (
              <div
                className="text-blue-500 font-medium px-2 py-1 rounded md:ml-2"
                onClick={handleFollowUser}
              >
                Follow
              </div>
            )}
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
            className="w-full mb-2"
          />
        ) : (
          <p className="py-2">{tweet_message}</p>
        )}

        <div className="border-t p-2 flex justify-between items-center">
          <div className="flex space-x-4 text-gray-600">
            <div className="flex items-center space-x-1 cursor-pointer font-medium hover:text-blue-500">
              <FaRegHeart />
              <span>12</span>
            </div>
            <div className="flex items-center space-x-1 cursor-pointer font-medium hover:text-green-500">
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
            localUsername === user && (
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
      {toast && <Toast message={editTweetsData?.message} type="success" />}
    </>
  );
};

export default TweetCard;
