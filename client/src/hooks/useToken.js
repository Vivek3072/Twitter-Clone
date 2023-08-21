import { useState } from "react";

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem("token");
    if (tokenString === "undefined") return null;
    const userToken = JSON.parse(tokenString);
    return userToken;
  };
  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    localStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken);
  };

  const removeToken = () => {
    localStorage.removeItem("token");
    setToken();
  };

  const getLocalName = () => {
    const username = localStorage.getItem("username");
    if (username === "undefined") return null;
    return username;
  };
  const [localUsername, setLocalName] = useState(getLocalName());

  const saveLocalName = (username) => {
    localStorage.setItem("username", username);
    setLocalName(username);
  };

  const removeLocalName = () => {
    localStorage.removeItem("username");
    setLocalName();
  };

  return {
    token,
    setToken: saveToken,
    removeToken,
    localUsername,
    setLocalName: saveLocalName,
    removeLocalName,
  };
}
