import { useEffect } from "react";
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

  return {
    accessChatLoading,
    accessChatError,
    accessNetworkError,
    accessChatData,
    accessChatResp,
    handleAccessChat,
  };
};

export default useChat;
