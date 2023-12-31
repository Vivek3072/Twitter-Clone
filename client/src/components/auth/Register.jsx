import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import useApi from "../../hooks/useApi";
import AuthController from "../../api/auth";
import useToken from "../../hooks/useToken";
import Logo from "../../assets/Logo.svg";

const Registration = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const [error, setError] = useState("");

  const { token, setToken } = useToken();

  const {
    res: registerResp,
    data: registerData,
    error: registerError,
    loading,
    networkError,
    request: registerFun,
  } = useApi(AuthController.register);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerFun({
        username,
        email,
        password,
        confirm_password,
      });
    } catch (err) {
      console.log(err, "Err register");
      setError("Sorry! Could not register.");
    }
  };

  useEffect(() => {
    if (
      !networkError &&
      !registerError &&
      registerResp &&
      registerData &&
      !loading
    ) {
      console.log(registerData, registerResp, "register page");
      setToken(registerData?.accessToken);
      // setLocalUsername(registerData?.username);
    } else {
      setError(registerData?.message);
    }
  }, [
    setToken,
    // setUsername,
    registerError,
    loading,
    networkError,
    registerResp,
    registerData,
  ]);

  if (token) return <Navigate to="/" replace={true} />;

  return (
    <div className="w-full flex flex-col md:flex-row h-screen bg-gray-800 px-5 md:px-20 lg:px-40">
      <div className="h-fit md:h-full py-3  w-full flex flex-col items-start justify-center">
        <div className="flex flex-row items-center">
          <img src={Logo} alt="Tweeter" className="w-16 h-16" />
          <div className="text-2xl md:text-4xl font-medium text-white ml-2">
            Welcome to tweeter!
          </div>
        </div>
        <p className="text-gray-400">
          A beautiful application where users can post tweet, follow, chat with
          people and a lot more!
        </p>
      </div>
      <div className="m-auto w-full p-6 bg-gradient-to-r from-[#121D2D] to-[#0C111C] rounded shadow-lg">
        <h1 className="text-2xl text-white font-semibold mb-4">
          Register yourself
        </h1>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-400 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-800 focus:bg-gray-700 text-white mt-1 p-2 w-full border rounded focus:outline-none focus:ring"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-400 font-medium"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="bg-gray-800 focus:bg-gray-700 text-white mt-1 p-2 w-full border rounded focus:outline-none focus:ring"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-400 font-medium"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-800 focus:bg-gray-700 text-white mt-1 p-2 w-full border rounded focus:outline-none focus:ring"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-400 font-medium"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="bg-gray-800 focus:bg-gray-700 text-white mt-1 p-2 w-full border rounded focus:outline-none focus:ring"
              value={confirm_password}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {error && (
            <div className="text-m text-red-500 text-center mb-3">{error}</div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring"
          >
            Register
          </button>
        </form>
        <div className="text-center text-gray-400 my-3">
          Already an User?
          <Link
            to="/login"
            className="text-blue-500 hover:text-blue-700 hover:underline ml-1"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Registration;
