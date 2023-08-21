import { useState, useEffect, useContext } from "react";
import useApi from "../../hooks/useApi";
import AuthController from "../../api/auth";
import useToken from "../../hooks/useToken";
import UserContext from "../../hooks/UserContext";

const UserList = () => {
  const { userData, setUserData } = useContext(UserContext);

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
      // console.log(allUsersData, allUsersResp, "allUsersResp");
      setAllUsers(allUsersData);
    }
  }, [error, loading, networkError, allUsersData, allUsersResp]);

  const { localUsername } = useToken();

  // THIS SECTIONS HANDLES THE LOGIC WHEN A USER FOLLOWS ANOTHER USER
  const {
    res: followResp,
    data: followData,
    error: followError,
    loading: followLoading,
    networkError: followNetworkError,
    request: followUserReq,
  } = useApi(AuthController.followUserReq);

  const handleFollowUser = async (user) => {
    console.log(localUsername, user, "Handlefollow");
    try {
      await followUserReq({
        username: localUsername,
        followUser: user,
      });
    } catch (err) {
      console.log(err, "Err register");
    }
  };

  useEffect(() => {
    if (
      !followLoading &&
      !followError &&
      followData &&
      followResp &&
      !followNetworkError
    ) {
      // console.log(followData, followResp, "register page");
      setUserData(followData);
    } else {
      console.log(followResp, "message");
    }
  }, [
    setUserData,
    followError,
    followLoading,
    followNetworkError,
    followResp,
    followData,
  ]);

  // THIS SECTIONS HANDLES THE LOGIC WHEN A USER UNFOLLOWS ANOTHER USER BY REMOVING THE USER FROM FOLLOWING LIST
  const {
    res: unfollowResp,
    data: unfollowData,
    error: unfollowError,
    loading: unfollowLoading,
    networkError: unfollowNetworkError,
    request: unfollowUser,
  } = useApi(AuthController.unfollowUser);

  const handleRemoveUser = async (user) => {
    console.log(localUsername, user, "Handlefollow");
    try {
      await unfollowUser({
        username: localUsername,
        removeUser: user,
      });
    } catch (err) {
      console.log(err, "Err register");
    }
  };

  useEffect(() => {
    if (
      !unfollowLoading &&
      !unfollowError &&
      unfollowData &&
      unfollowResp &&
      !unfollowNetworkError
    ) {
      console.log(unfollowResp, unfollowData, "unfollow user page");
      setUserData(unfollowData);
      // window.location.reload;
    } else {
      console.log(unfollowResp, "message");
    }
  }, [
    setUserData,
    unfollowError,
    unfollowLoading,
    unfollowNetworkError,
    unfollowResp,
    unfollowData,
  ]);

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

            {user.username !== localUsername && (
              <div className="my-auto">
                {userData?.following?.find(
                  (data) => data.username === user.username
                ) ? (
                  <div
                    className="h-fit my-auto bg-red-500 text-white px-5 py-1 rounded-full hover:cursor-pointer transition-all duration-300"
                    onClick={() => handleRemoveUser(user.username)}
                  >
                    Unfollow
                  </div>
                ) : (
                  <div
                    className="h-fit my-auto bg-blue-500 text-white px-5 py-1 rounded-full hover:cursor-pointer transition-all duration-300"
                    onClick={() => handleFollowUser(user.username)}
                  >
                    Follow
                  </div>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
