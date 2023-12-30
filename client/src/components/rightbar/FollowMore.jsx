import { useContext } from "react";
import { useTheme } from "../../hooks/ThemeContext";
import UserContext from "../../hooks/UserContext";

const FollowMore = () => {
  const { isDarkMode } = useTheme();
  const { userData } = useContext(UserContext);

  return (
    <>
      <div
        className={`${
          isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white"
        } border rounded p-4 mb-4 my-2`}
      >
        <div className="text-xl font-medium mb-2">Accounts you follow</div>
        <ul>
          {userData &&
            userData.following?.length > 0 &&
            userData.following.map((account, idx) => (
              <li key={idx} className="flex items-center space-x-2 mb-2">
                <div>
                  <p className="font-semibold">{account.username}</p>
                  <p className="text-gray-600">@{account.username}</p>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default FollowMore;
