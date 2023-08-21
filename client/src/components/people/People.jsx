import { useState, useEffect } from "react";
import useApi from "../../hooks/useApi";
import AuthController from "../../api/auth";

const UserList = () => {
  const [allUsers, setAllUsers] = useState([]);
  const {
    res: allUsersResp,
    data: allUsersData,
    error,
    loading,
    networkError,
    request: getAllUsers,
  } = useApi(AuthController.getAllUsers);

  const getAllUsersFun = async () => {
    try {
      await getAllUsers();
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  useEffect(() => {
    getAllUsersFun();
  }, []);

  useEffect(() => {
    if (!networkError && !error && allUsersData && allUsersResp && !loading) {
      console.log(allUsersData, allUsersResp, "allUsersResp");
      setAllUsers(allUsersData);
    }
  }, [error, loading, networkError, allUsersData, allUsersResp]);

  return (
    <div className="bg-gray-50 rounded min-h-screen p-6 overflow-y-auto">
      <h1 className="text-2xl font-semibold mb-4">
        User List on Twitter Clone
      </h1>
      <ul className="space-y-4">
        {allUsers?.map((user) => (
          <li
            key={user._id}
            className="bg-white p-4 rounded-lg shadow-md flex justify-between"
          >
            <div>
              <p className="text-lg font-semibold">{user.username}</p>
              <p className="text-gray-600">{user.email}</p>
            </div>
            <button className="h-fit my-auto bg-blue-500 text-white px-5 py-1 rounded-full">
              Follow
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
