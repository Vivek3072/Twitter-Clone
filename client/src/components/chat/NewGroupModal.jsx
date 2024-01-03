import { MdClose } from "react-icons/md";
import { useTheme } from "../../hooks/ThemeContext";
import Input from "../utils/Input";
import useUserApi from "../../api/controller/useUserApi";
import { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import ChatController from "../../api/chat";
import { useNavigate } from "react-router-dom";

export default function NewGroupModal({ newGroupPopup, setNewGroupPopup }) {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  const [groupName, setGroupName] = useState("");
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [selectedUserdata, setSelectedUserdata] = useState([]);
  const [warning, setWarning] = useState("You must select atleast two users!");

  const { search, setSearch, allUsers } = useUserApi();
  const handleSelectedUsers = (user) => {
    setSelectedUserIds((prev) => [...prev, user._id]);
    setSelectedUserdata((prev) => [
      ...prev,
      { _id: user._id, username: user.username },
    ]);
  };

  useEffect(() => {
    console.log(
      selectedUserdata,
      selectedUserIds,
      "render after setSelectedUsers"
    );
  }, [selectedUserIds, selectedUserdata]);

  // Filter users that are not selected
  const filteredUsers = allUsers.filter(
    (user) => !selectedUserIds.includes(user._id)
  );

  //handling the remove selected users logic
  const removeSelectedUser = (user) => {
    setSelectedUserIds((prevIds) => prevIds.filter((id) => id !== user._id));
    setSelectedUserdata((prevData) =>
      prevData.filter((userData) => userData._id !== user._id)
    );
  };

  const {
    error,
    networkError,
    loading,
    res,
    data,
    request: createGroupChat,
  } = useApi(ChatController.createGroupChat);

  const handleCreateNewGroup = async () => {
    if (!groupName) {
      setWarning("Please provide group name!");
      return;
    }
    try {
      await createGroupChat({
        users: JSON.stringify(selectedUserIds),
        groupName: groupName,
      });
    } catch (error) {
      console.log("Error creating group ", error);
    }
  };

  useEffect(() => {
    if (!loading && !error && !networkError && res && data) {
      navigate(`/message/${data._id}`);
    }
  }, [loading, error, networkError, res, data, navigate]);

  return (
    <div
      className={`
    ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-200 text-black"}
    ${newGroupPopup ? "translate-x-0" : "translate-x-full"}
    z-10 absolute md:right-[25%] lg:right-[35%] top-[100px] w-[95%] md:w-[400px] lg:w-[600px] h-fit px-5 py-4 rounded shadow-xl
  `}
    >
      <div className="flex flex-row items-center justify-between">
        <div className="text-xl">Fill group details</div>
        <button
          onClick={() => setNewGroupPopup(!newGroupPopup)}
          className="bg-primary hover:bg-primaryDark rounded-full p-2"
        >
          <MdClose className="text-xl" />
        </button>
      </div>
      <div className="my-5">
        <input
          type="text"
          className={`${
            isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-600"
          } p-3 h-full w-full rounded-full focus:outline-none border`}
          placeholder="Enter group name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <Input inputValue={search} inputHandlerFunction={setSearch} />

        <div className="h-40 overflow-y-scroll">
          {allUsers &&
            search?.length > 0 &&
            filteredUsers.map((user, idx) => {
              return (
                <div
                  key={idx}
                  className={`${
                    isDarkMode ? "bg-gray-800" : "bg-white"
                  } rounded p-2 py-1 m-1 cursor-pointer hover:bg-primary flex flex-row items-center`}
                  onClick={() => handleSelectedUsers(user)}
                >
                  <img
                    src={user?.profilePic}
                    alt={user.username}
                    className="w-6 h-6 rounded-full"
                  />
                  <div className="ml-2">{user?.username}</div>
                </div>
              );
            })}
        </div>

        <div className="flex flex-wrap">
          {selectedUserdata &&
            selectedUserdata.map((user, idx) => {
              return (
                <div
                  key={idx}
                  className="flex flex-row items-center bg-gray-600 rounded-full px-3 py-2 w-fit mx-1"
                >
                  <div>{user.username}</div>
                  <div
                    className="bg-black bg-opacity-30 rounded-full cursor-pointer ml-2 p-1"
                    onClick={() => removeSelectedUser(user)}
                  >
                    <MdClose />
                  </div>
                </div>
              );
            })}
        </div>

        <button
          className={`${
            selectedUserIds?.length < 2 && "bg-opacity-50"
          } bg-primary rounded-full px-3 py-2 w-full my-2`}
          disabled={selectedUserIds?.length < 2}
          onClick={handleCreateNewGroup}
        >
          Create Group
        </button>
        <p className="text-sm text-center text-red-600">{warning}</p>
      </div>
    </div>
  );
}
