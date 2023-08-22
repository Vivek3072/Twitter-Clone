import { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import AuthController from "../../api/auth";
import UserLoader from "../loader/UserLoader";
import { useTheme } from "../../hooks/ThemeContext";

const FollowMore = () => {
  const { isDarkMode } = useTheme();
  const [followedAccounts, setFollowedAccounts] = useState([]);

  const {
    res: resp,
    data,
    error: fetchError,
    loading,
    networkError,
    request: currentUser,
  } = useApi(AuthController.currentUser);

  const getUser = async () => {
    try {
      await currentUser();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (!networkError && !fetchError && resp && data && !loading) {
      // console.log(resp, data, "current page");
      setFollowedAccounts(data?.user[0].following);
    }
  }, [fetchError, loading, networkError, resp, data]);

  return (
    <>
      <div
        className={`${
          isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white"
        } border rounded p-4 mb-4 my-2`}
      >
        <div className="text-xl font-medium mb-2">Accounts you follow</div>
        <ul>
          {followedAccounts && !loading ? (
            followedAccounts?.map((account, idx) => (
              <li key={idx} className="flex items-center space-x-2 mb-2">
                <img
                  src={`https://avatars.dicebear.com/api/identicon/${account.username}.svg`}
                  alt={account.username}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="font-semibold">{account.username}</p>
                  <p className="text-gray-600">@{account.username}</p>
                </div>
              </li>
            ))
          ) : (
            <>
              <UserLoader />
              <UserLoader />
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default FollowMore;
