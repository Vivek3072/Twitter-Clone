import { useState, useEffect, useContext } from "react";
import useApi from "../../hooks/useApi";
import AuthController from "../../api/auth";
import useToken from "../../hooks/useToken";
import UserContext from "../../hooks/UserContext";
import UserLoader from "../loader/UserLoader";
import { useTheme } from "../../hooks/ThemeContext";

const UserList = () => {
  const { userData, setUserData } = useContext(UserContext);

  const { isDarkMode } = useTheme();

  const [allUsers, setAllUsers] = useState([]);
  const [search, setSearch] = useState("");

  const {
    res: allUsersResp,
    data: allUsersData,
    error,
    loading,
    networkError,
    request: searchUsers,
  } = useApi(AuthController.searchUsers);

  const getAllUsersFun = async (query) => {
    try {
      await searchUsers(query);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getAllUsersFun(search);
  }, [search]);

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
    // console.log(localUsername, user, "Handlefollow");
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
    <div
      className={`${
        isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white"
      } rounded h-full p-2 md:p-6 overflow-y-auto`}
    >
      <h1 className="text-2xl font-semibold mb-4">
        User&apos;s List on Tweeter
      </h1>
      <div className="mmt-3 mb-5">
        <input
          type="text"
          placeholder="Search users by their username..."
          className={`${
            isDarkMode
              ? "bg-gray-800 text-white"
              : "bg-white text-gray-600 border border-gray-400"
          } mt-1 p-3 w-full border focus:border-primary rounded-full focus:outline-none`}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            getAllUsersFun(e.target.value);
          }}
        />
      </div>
      <ul className="space-y-4">
        {allUsers.length <= 0 && (
          <div className="flex flex-col justify-center">
            <div className="text-xl text-center">No such user found!</div>
            <button
              onClick={() => setSearch("")}
              className="border border-blue-500 rounded-lg px-5 py-2 mx-auto transition hover:bg-blue-500 hover:text-white my-3"
            >
              View All Users
            </button>
          </div>
        )}
        {allUsers && !loading ? (
          allUsers?.map((user) => (
            <li
              key={user._id}
              className={`${
                isDarkMode
                  ? "bg-gray-800 text-gray-300 border border-gray-700"
                  : "bg-white text-black"
              } p-4 rounded-lg shadow-md flex justify-between`}
            >
              <div className="flex flex-row items-center">
                <img
                  src={user.profilePic}
                  alt={user.username}
                  className="w-10 h-10 rounded-full border"
                />
                <div className="ml-2">
                  <p className="text-lg font-semibold">{user.username}</p>
                  <p className="text-gray-400">{user.email}</p>
                </div>
              </div>

              {user.username !== localUsername && (
                <div className="my-auto">
                  {userData?.following?.find(
                    (data) => data.username === user.username
                  ) ? (
                    <div
                      className={`h-fit my-auto bg-red-500 text-white px-5 py-1 rounded-full hover:cursor-pointer transition-all duration-300 ${
                        unfollowLoading && "bg-opacity-50"
                      }`}
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
          ))
        ) : (
          <>
            <UserLoader />
            <UserLoader />
            <UserLoader />
          </>
        )}
      </ul>
    </div>
  );
};

export default UserList;
