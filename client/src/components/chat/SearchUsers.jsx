import UserLoader from "../loader/UserLoader";
import { useTheme } from "../../hooks/ThemeContext";
import Input from "../utils/Input";
import useUserApi from "../../api/services/useUserApi";
import useChat from "../../api/services/chat/useChat";

const SearchUsers = () => {
  const { isDarkMode } = useTheme();

  const { allUsers, search, setSearch, loading } = useUserApi();
  const { handleAccessChat } = useChat();

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white"
      } rounded relative`}
    >
      <Input inputValue={search} inputHandlerFunction={setSearch} />
      {search?.length > 0 && (
        <ul
          className={`${
            isDarkMode ? " bg-gray-900" : "bg-gray-200"
          } "rounded w-full min-h-24 absolute shadow-xl bg-opacity-100"`}
        >
          {allUsers.length <= 0 && !loading && (
            <div className="flex flex-col justify-center rounded">
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
            allUsers?.map((user, idx) => (
              <li
                key={idx}
                className={`${
                  isDarkMode
                    ? "bg-gray-800 text-gray-300 border border-gray-700"
                    : "bg-white text-black"
                } p-4 hover:bg-primaryDark hover:text-white cursor-pointer shadow-md flex justify-between`}
                onClick={() => handleAccessChat(user._id)}
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
                <div className="w-40 text-white font-medium cursor-pointer hover:bg-primary hover:bg-opacity-20 px-3 py-2 rounded-full text-center">
                  Chat Now
                </div>
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
      )}
    </div>
  );
};

export default SearchUsers;
