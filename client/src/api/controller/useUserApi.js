import { useState, useEffect } from "react";
import useApi from "../../hooks/useApi";
import AuthController from "../auth";

const useUserApi = () => {
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

  const getAllUsersFun = async (search) => {
    try {
      await searchUsers(search);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getAllUsersFun(search);
  }, [search]);

  useEffect(() => {
    if (!networkError && !error && allUsersData && allUsersResp && !loading) {
      setAllUsers(allUsersData);
    }
  }, [error, loading, networkError, allUsersData, allUsersResp]);

  return {
    allUsers,
    search,
    loading,
    error,
    networkError,
    setSearch,
  };
};

export default useUserApi;
