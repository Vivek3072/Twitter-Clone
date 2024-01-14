import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/ThemeContext";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../hooks/UserContext";
import SearchUsers from "./SearchUsers";
import NewGroupModal from "./NewGroupModal";
import {
  getSenderPicture,
  getSenderUsername,
} from "../../api/config/getSender";
import useChat from "../../api/services/chat/useChat";

const ChatList = () => {
  const { isDarkMode } = useTheme();
  const { userData, setChatsData } = useContext(UserContext);

  const { allChats } = useChat();

  useEffect(() => {
    setChatsData(allChats);
  }, [allChats, setChatsData]);

  //Representing the time in proper format
  const handleDateFormat = (time) => {
    const dateObject = new Date(time);

    const dateOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: "UTC",
    };

    const formattedDate = dateObject.toLocaleString("en-US", dateOptions);
    return formattedDate;
  };

  const [newGroupPopup, setNewGroupPopup] = useState(false);
  return (
    <>
      {newGroupPopup && (
        <NewGroupModal
          newGroupPopup={newGroupPopup}
          setNewGroupPopup={setNewGroupPopup}
        />
      )}

      <div className="flex flex-row justify-between space-x-2 items-center my-4">
        <div
          className={`my-5 font-medium w-full
            ${isDarkMode ? "text-white text-2xl" : "text-black text-2xl"}
          `}
        >
          Messages
        </div>
        <div
          className="w-48 text-primary font-medium cursor-pointer hover:bg-primary hover:bg-opacity-20 px-3 py-2 rounded-full text-center"
          onClick={() => setNewGroupPopup(!newGroupPopup)}
        >
          + New Group
        </div>
      </div>
      <SearchUsers />
      <ul className="my-3">
        {allChats.length > 0 ? (
          allChats?.map((chat, idx) => (
            <Link
              key={idx}
              to={`/message/${chat._id}`}
              className={`${
                isDarkMode ? "bg-[#121D2D] text-white" : "bg-gray-50 text-black"
              } w-full flex flex-row items-center justify-between my-2 px-3 py-2 rounded hover:shadow`}
            >
              <div className="flex flex-row items-center">
                {chat?.isGroupChat ? (
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/166/166258.png"
                    alt={chat.username}
                    className="w-10 h-10 rounded-full border"
                  />
                ) : (
                  <img
                    src={getSenderPicture(userData, chat.users)}
                    alt={chat.username}
                    className="w-10 h-10 rounded-full border"
                  />
                )}
                <div>
                  {chat?.isGroupChat ? (
                    <div className="text-lg ml-2">
                      {chat.chatName}
                      <span
                        className={`text-sm ml-1 ${
                          isDarkMode ? "text-gray-200" : "text-gray-700"
                        }`}
                      >
                        ({chat.users?.length} participants)
                      </span>
                    </div>
                  ) : (
                    <div className="text-lg ml-2">
                      {getSenderUsername(userData, chat.users)}
                    </div>
                  )}
                  <div className="text-[12px] text-gray-400 ml-2">
                    {chat?.latestMessage ? (
                      <div>
                        <span
                          className={
                            isDarkMode
                              ? "text-gray-400 font-medium mr-1"
                              : "text-white font-medium mr-1"
                          }
                        >
                          {chat.latestMessage.sender.username} :
                        </span>
                        {chat.latestMessage.content}
                      </div>
                    ) : (
                      "N/A"
                    )}
                  </div>
                </div>
              </div>
              <div
                className={
                  isDarkMode ? "text-gray-300 text-sm" : "text-gray-800 text-sm"
                }
              >
                {handleDateFormat(chat?.createdAt)}
              </div>
            </Link>
          ))
        ) : (
          <div
            className={`${
              isDarkMode ? "text-white" : "text=black"
            } text-center p-3`}
          >
            Nothing to show here...
          </div>
        )}
      </ul>
    </>
  );
};

export default ChatList;
