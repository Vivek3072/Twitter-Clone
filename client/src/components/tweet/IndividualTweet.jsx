import { useParams } from "react-router-dom";
import { useTheme } from "../../hooks/ThemeContext";
import useTweet from "../../api/services/useTweet";
import { useContext, useEffect } from "react";
import { FaRegHeart } from "react-icons/fa";
import { MdShare } from "react-icons/md";
import UserContext from "../../hooks/UserContext";

const IndividualTweet = () => {
  const { tweet_id } = useParams();
  const { isDarkMode } = useTheme();
  const { userData } = useContext(UserContext);

  const { indivTweet, getIndividualTweet } = useTweet();

  useEffect(() => {
    getIndividualTweet(tweet_id);
  }, []);

  const copyTweetLink = (id) => {
    navigator.clipboard.writeText(
      `http://localhost:5173/tweet/${id}`
      // `https://twitter-clone-zwb6.onrender.com/tweet/${id}`
    );
  };
  return (
    <>
      {indivTweet && (
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
                src={indivTweet?.profilePic}
                alt={`User ${indivTweet?.username}`}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div className="flex flex-col justify-start">
                <div className="text-lg font-medium">{`@${indivTweet.username}`}</div>
                {userData?.following?.find(
                  (data) => data.username === indivTweet.username
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
              <span className="text-xs">{indivTweet.createdAt}-</span>
              {/* <span className="text-xs">{formattedTimeString}</span> */}
            </div>
          </div>
          {/* <span className="text-xs">{indivTweet.createdAt}-</span> */}

          <div className="py-2">
            {indivTweet.tweet_message}

            {indivTweet?.isEdited && (
              <span className="text-gray-400 italic text-xs mx-1">edited</span>
            )}
          </div>

          {indivTweet.image && (
            <div className="flex items-center justify-center bg-gray-500 bg-opacity-10 px-2 md:px-10 w-full h-fit max-h-[50vh] rounded-lg overflow-auto mb-2 snap-center">
              <img
                src={indivTweet.image}
                alt="tweet_image"
                className="rounded-lg"
              />
            </div>
          )}
          <div className="border-t border-gray-400 p-2 flex justify-between items-center">
            <div className="flex space-x-4 text-gray-600">
              <div className="flex items-center space-x-1 cursor-pointer font-medium hover:text-blue-500">
                <FaRegHeart />
                <span>{indivTweet.likes?.length}</span>
              </div>
              <div
                className="flex items-center space-x-1 cursor-pointer font-medium hover:text-green-500"
                onClick={() => copyTweetLink(tweet_id)}
              >
                <MdShare />
              </div>
            </div>
            {/* {isEditing ? (
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
          )} */}
          </div>
        </div>
      )}
      {/* {toast && <Toast message="Operation Successfull!" type="success" />} */}
    </>
  );
};

export default IndividualTweet;
