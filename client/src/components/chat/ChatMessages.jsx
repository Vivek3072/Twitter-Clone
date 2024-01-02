import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTheme } from "../../hooks/ThemeContext";
import { MdKeyboardBackspace, MdInfo, MdSend } from "react-icons/md";

const ChatMessages = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const mockMessages = [
      {
        id: 1,
        text: "Hello",
        sender: "User1",
        profilePic:
          "https://xsgames.co/randomusers/assets/avatars/pixel/45.jpg",
      },
      {
        id: 2,
        text: "Hi there",
        sender: "User2",
        profilePic:
          "https://xsgames.co/randomusers/assets/avatars/pixel/46.jpg",
      },
    ];

    setMessages(mockMessages);
  }, [id]);

  return (
    <div
      className={`${
        isDarkMode ? "bg-[#121D2D]" : "bg-gray-50"
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
          <div className="ml-2">User_{id}</div>
        </div>
        <div className="text-primary font-medium cursor-pointer hover:bg-primary hover:bg-opacity-20 p-2 rounded-full">
          <MdInfo />
        </div>
      </div>{" "}
      <ul className="h-[300px] md:h-[80vh]">
        {messages.map((message) => (
          <li key={message.id}>
            <strong>{message.sender}:</strong> {message.text}
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
        />
        <button className="h-fit bg-primary hover:bg-primaryDark ml-2 text-white rounded-full px-5 py-5">
          <MdSend size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatMessages;
