import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/ThemeContext";
import { useEffect, useState } from "react";
import ChatController from "../../api/chat";
import useApi from "../../hooks/useApi";

const dateOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  timeZone: "UTC",
};

const ChatList = () => {
  const { isDarkMode } = useTheme();

  const [allChats, setAllChats] = useState([]);
  const {
    res: allChatsResp,
    data: allChatsData,
    error,
    loading,
    networkError,
    request: fetchChats,
  } = useApi(ChatController.fetchChats);

  const getAllChats = async () => {
    try {
      await fetchChats();
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  useEffect(() => {
    getAllChats();
  }, []);

  useEffect(() => {
    if (!networkError && !error && allChatsResp && allChatsData && !loading) {
      console.log(allChatsData, "allChatsResp");
      setAllChats(allChatsData);
    }
  }, [error, loading, networkError, allChatsResp, allChatsData]);

  //Representing the time in proper format
  const handleDateFormat = (time) => {
    const dateObject = new Date(time);
    const formattedDate = dateObject.toLocaleString("en-US", dateOptions);
    return formattedDate;
  };
  return (
    <>
      <div className="flex flex-row justify-between items-center my-4">
        <div
          className={isDarkMode ? "text-white text-2xl" : "text-black text-2xl"}
        >
          Messages
        </div>
        <div className="text-primary font-medium cursor-pointer hover:bg-primary hover:bg-opacity-20 px-3 py-2 rounded-full">
          + New Group
        </div>
      </div>

      <ul className="my-3">
        {allChats?.map((chat, idx) => (
          <Link
            key={idx}
            to={`/message/${chat._id}`}
            className={`${
              isDarkMode ? "bg-[#121D2D] text-white" : "bg-gray-50 text-black"
            } w-full flex flex-row items-center justify-between my-2 px-3 py-2 rounded hover:shadow`}
          >
            <div className="flex flex-row">
              {chat?.isGroupChat ? (
                <img
                  src={
                    "https://xsgames.co/randomusers/assets/avatars/pixel/0.jpg"
                  }
                  alt={chat.username}
                  className="w-10 h-10 rounded-full border"
                />
              ) : (
                <img
                  src={chat.users[1].profilePic}
                  alt={chat.username}
                  className="w-10 h-10 rounded-full border"
                />
              )}
              <div>
                <div className="text-lg ml-2">
                  {chat?.isGroupChat
                    ? chat?.chatName + "  group"
                    : chat?.users[1].username}
                </div>
                <div className="text-sm font-medium ml-2">
                  {chat?.latestMessage ? chat.latestMessage : "N/A"}
                </div>
              </div>
            </div>
            <div
              className={
                isDarkMode ? "text-gray-300 text-sm" : "text-gray-800 text-xsm"
              }
            >
              {handleDateFormat(chat?.createdAt)}
            </div>
          </Link>
        ))}
      </ul>
    </>
  );
};

export default ChatList;
