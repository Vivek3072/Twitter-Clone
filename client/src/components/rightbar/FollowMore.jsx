import { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import AuthController from "../../api/auth";

const FollowMore = () => {
  const [followedAccounts, setFollowedAccounts] = useState([]);
  // const suggestedAccounts = [
  //   { id: 1, username: "user1", name: "User One" },
  //   { id: 2, username: "user2", name: "User Two" },
  //   { id: 3, username: "user3", name: "User Three" },
  // ];

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
      console.log(resp, data, "current page");
      setFollowedAccounts(data?.user[0].following);
    }
  }, [fetchError, loading, networkError, resp, data]);

  return (
    <>
      <div className="bg-white border rounded p-4 mb-4">
        <div className="text-xl font-medium mb-2">Accounts you follow</div>
        <ul>
          {followedAccounts && !loading ? (
            followedAccounts?.map((account) => (
              <li key={account.id} className="flex items-center space-x-2 mb-2">
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
            <div className="text-center text-gray-500 my-3">
              Nothing to show here!
            </div>
          )}
        </ul>
      </div>
    </>
  );
};

export default FollowMore;
