import { useEffect, useState } from "react";
import TweetCardLoader from "../loader/TweetCardLoader";
import ProfileHeader from "./ProfileHeader";
import useToken from "../../hooks/useToken";
import AuthController from "../../api/auth";
import useApi from "../../hooks/useApi";
import { Navigate } from "react-router-dom";

export default function Profile() {
  const profile = {
    coverImage:
      "https://images.unsplash.com/photo-1614850715649-1d0106293bd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFja2dyb3VuZCUyMGNvdmVyfGVufDB8fDB8fHww&w=1000&q=80",
  };
  const [user, setUser] = useState([]);

  const { token, setToken } = useToken();

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
      setUser(data?.user[0]);
    }
  }, [setToken, fetchError, loading, networkError, resp, data]);

  if (!token) return <Navigate to="/login" replace={true} />;

  return (
    <div>
      <ProfileHeader
        user={user}
        username={user.username}
        avatar={profile.avatar}
        coverImage={profile.coverImage}
      />
      <div className="my-5">
        <TweetCardLoader />
        <TweetCardLoader />
      </div>
    </div>
  );
}
