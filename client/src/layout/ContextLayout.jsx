import { useEffect, useState } from "react";
import UserContext from "../hooks/UserContext";
import useApi from "../hooks/useApi";
import AuthController from "../api/controllers/auth";

export default function ContextLayout({ children }) {
  const [userData, setUserData] = useState([]);

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
      setUserData(data?.user[0]);
    }
  }, [fetchError, loading, networkError, resp, data]);

  return (
    <>
      <UserContext.Provider value={{ userData, setUserData }}>
        {children}
      </UserContext.Provider>
    </>
  );
}
