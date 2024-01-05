import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTheme } from "../../hooks/ThemeContext";
import { MdKeyboardBackspace, MdInfo, MdSend } from "react-icons/md";
import useMessage from "../../api/services/chat/useMessage";
import UserContext from "../../hooks/UserContext";
import { socket } from "../../socket/socket";
// import { getSenderUsername } from "../../api/config/getSender";

var selected_chat_cmp;
const ChatMessages = () => {
  const { id } = useParams();
  selected_chat_cmp = id;

  const { isDarkMode } = useTheme();
  const { userData, chatsData } = useContext(UserContext);

  const currentChat = chatsData.find((chat) => chat._id === id);
  // const getAnotherUser = currentChat.users.find((user)=>user.username === getSenderUsername(userData,currentChat.users))
  // console.log(getAnotherUser, "getAnotherUser");

  const {
    messages,
    handleGetMessages,
    newMessage,
    setMessages,
    setNewMessage,
    handleSendMessage,
  } = useMessage();

  useEffect(() => {
    handleGetMessages(id);
  }, [id, newMessage]);

  useEffect(() => {
    const handleReceivedMessage = (newMessageRecieved) => {
      if (selected_chat_cmp === newMessageRecieved.chat._id) {
        setMessages([...messages, newMessageRecieved]); //here using the functional way of updating the state lead to setting the state twice------ when using a callback with setMessages, React can encounter issues when it tries to batch updates. In some cases, this can lead to unexpected behavior, such as the callback being executed more than once.
      }
    };

    socket.on("message received", handleReceivedMessage);

    return () => {
      socket.off("message received", handleReceivedMessage);
    };
  }, [messages, setMessages]);

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    function onConnect() {
      setIsConnected(!isConnected);
    }

    function onDisconnect() {
      setIsConnected(!isConnected);
    }

    socket.emit("setup", userData);
    socket.on("connection", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connection", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, [isConnected, setIsConnected, userData]);

  return (
    <div
      className={`${
        isDarkMode ? "bg-[#121D2D]" : "bg-gray-100"
      } h-full rounded p-2`}
    >
      <div className="flex flex-row justify-between items-center my-3 border-b p-2">
        <div
          className={`${
            isDarkMode ? "text-white text-2xl" : "text-black text-2xl"
          } flex flex-row items-center`}
        >
          <Link to="/message" className="mr-3 hover:text-primary ">
            <MdKeyboardBackspace />
          </Link>
          <img
            src={"https://xsgames.co/randomusers/assets/avatars/pixel/45.jpg"}
            alt=""
            className="w-8 h-8 rounded-full border"
          />
          <div className="ml-2 text-sm">{currentChat?.chatName}</div>
        </div>
        <div className="text-primary font-medium cursor-pointer hover:bg-primary hover:bg-opacity-20 p-2 rounded-full">
          <MdInfo />
        </div>
      </div>

      <ul className="w-full p-2 h-[300px] md:h-[80vh] overflow-y-auto">
        {messages &&
          messages.map((message) => (
            <li
              key={message._id}
              className={`${
                message.sender?._id === userData._id
                  ? "flex-row-reverse"
                  : "flex-row"
              } flex w-full justify-between`}
            >
              <div
                className={`${
                  message.sender?._id === userData._id
                    ? "flex-row-reverse"
                    : "flex-row"
                } flex flex-row items-center  my-1`}
                // className={`${
                //   message.sender?._id === userData._id
                //     ? "bg-primary rounded-br-[0px]"
                //     : "bg-gray-500 rounded-bl-[0px]"
                // } w-[250px] h-fit text-white rounded-2xl p-2 my-2 flex items-start`}
              >
                <img
                  src={message.sender?.profilePic}
                  alt=""
                  className="w-6 h-6 md:w-8 md:h-8 rounded-full mt-auto border mx-1"
                />
                <div
                  className={`${
                    message.sender?._id === userData._id
                      ? "bg-primary rounded-br-[0px]"
                      : "bg-gray-400 rounded-bl-[0px]"
                  } w-[200px] md:w-[250px] h-fit text-white rounded-2xl p-2 flex items-start text-sm md:text-base`}
                >
                  {message.content}
                </div>
              </div>
            </li>
          ))}
      </ul>

      <div className={`rounded-full flex flex-row justify-between`}>
        <textarea
          rows={1}
          placeholder="Type your message here..."
          className={`${
            isDarkMode ? "bg-gray-800 text-white" : "text-black"
          } border focus:outline-none rounded-full w-full p-3`}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          className="h-fit bg-primary hover:bg-primaryDark ml-2 text-white rounded-full px-5 py-5"
          onClick={() => handleSendMessage(newMessage, id)}
        >
          <MdSend size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatMessages;
