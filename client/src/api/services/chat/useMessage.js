import { useEffect, useState } from "react";
import useApi from "../../../hooks/useApi";
import MessageController from "../../controllers/message";

const useMessage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const {
    res: getMsgResp,
    data: getMsgData,
    getMsgError,
    getMsgLoading,
    getMsgNetworkError,
    request: fetchAllMessages,
  } = useApi(MessageController.fetchAllMessages);

  const handleGetMessages = async (id) => {
    try {
      await fetchAllMessages(id);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    if (
      !getMsgLoading &&
      !getMsgError &&
      !getMsgNetworkError &&
      getMsgResp &&
      getMsgData
    ) {
      console.log(getMsgData, "getMsgData");
      setMessages(getMsgData);
    }
  }, [getMsgResp, getMsgData, getMsgError, getMsgLoading, getMsgNetworkError]);

  const {
    res: newMsgResp,
    data: newMsgData,
    newMsgError,
    newMsgLoading,
    newMsgNetworkError,
    request: sendMessage,
  } = useApi(MessageController.sendMessage);

  const handleSendMessage = async (msg, chatId) => {
    try {
      await sendMessage({ content: msg, chatId: chatId });
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    if (
      !newMsgLoading &&
      !newMsgError &&
      !newMsgNetworkError &&
      newMsgResp &&
      newMsgData
    ) {
      console.log(newMsgData, "newMsgData");
    //   setMessages((msg) => [...msg, newMsgData]);
      setNewMessage("");
    }
  }, [
    // messages,
    // setMessages,
    setNewMessage,
    newMessage,
    newMsgResp,
    newMsgError,
    newMsgLoading,
    newMsgData,
    newMsgNetworkError,
  ]);

  return {
    messages,
    getMsgError,
    getMsgLoading,
    getMsgNetworkError,
    handleGetMessages,
    newMessage,
    setNewMessage,
    handleSendMessage,
  };
};

export default useMessage;
