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

  //   const getName = () => {
  //     const username = localStorage.getItem("username");
  //     if (username === "undefined") return null;
  //     return username;
  //   };
  //   const [name, setName] = useState(getName());

  //   const saveName = (username) => {
  //     localStorage.setItem("username", username);
  //     setName(username);
  //   };

  //   const removeName = () => {
  //     localStorage.removeItem("username");
  //     setName();
  //   };

  return {
    token,
    setToken: saveToken,
    removeToken,
    // username,
    // setName: saveName,
    // removeName,
  };
}
