import { useEffect, useState } from "react";
import useApi from "../../../hooks/useApi";
import ChatController from "../../controllers/chat";
import { useNavigate } from "react-router-dom";

const useChat = () => {
  const navigate = useNavigate();

  const {
    res: accessChatResp,
    data: accessChatData,
    accessChatError,
    accessChatLoading,
    accessNetworkError,
    request: accessChat,
  } = useApi(ChatController.accessChat);

  const handleAccessChat = async (id) => {
    try {
      await accessChat({ receiver_id: id });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    if (
      !accessChatError &&
      !accessChatLoading &&
      !accessNetworkError &&
      accessChatResp &&
      accessChatData
    ) {
      console.log(`/message/${accessChatData._id}`);
      // Handle navigation or any other logic here
      navigate(`/message/${accessChatData._id}`);
    }
  }, [
    accessChatError,
    accessChatLoading,
    accessNetworkError,
    accessChatResp,
    accessChatData,
    navigate,
  ]);

  //FETCHING ALL THE CHATS FOR LOGGED IN USER
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
      setAllChats(allChatsData);
    }
  }, [error, loading, networkError, allChatsResp, allChatsData]);

  return {
    accessChatLoading,
    accessChatError,
    accessNetworkError,
    accessChatData,
    accessChatResp,
    handleAccessChat,
    allChats,
    setAllChats,
    getAllChats,
  };
};

export default useChat;
