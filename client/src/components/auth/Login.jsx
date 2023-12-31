import { useEffect, useState } from "react";
import useToken from "../../hooks/useToken";
import { Link, Navigate } from "react-router-dom";
import useApi from "../../hooks/useApi";
import AuthController from "../../api/auth";
import Logo from "../../assets/Logo.svg";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const { token, setToken, setLocalName } = useToken();

  const {
    res: loginResp,
    data: loginData,
    error: loginError,
    loading,
    networkError,
    request: login,
  } = useApi(AuthController.login);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login({
        username,
        password,
      });
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  };

  useEffect(() => {
    if (!networkError && !loginError && loginResp && loginData && !loading) {
      setError();
      setToken(loginData.accessToken);
      setLocalName(loginData.username);
      window.location.replace("/");
    } else if (networkError) {
      setError("Network Error!");
    } else {
      setError(loginData?.message);
    }
  }, [
    setToken,
    setLocalName,
    loginError,
    loading,
    networkError,
    loginResp,
    loginData,
  ]);

  if (token) return <Navigate to="/" replace={true} />;
  return (
    <>
      <div className="w-full flex flex-col md:flex-row h-screen bg-gray-800 px-5 md:px-20 lg:px-40">
        <div className="h-fit md:h-full py-3  w-full flex flex-col items-start justify-center">
          <div className="flex flex-row items-center">
            <img src={Logo} alt="Tweeter" className="w-16 h-16" />
            <div className="text-2xl md:text-4xl font-medium text-white ml-2">
              Welcome to tweeter!
            </div>
          </div>
          <p className="text-gray-400">
            A beautiful application where users can post tweet, follow, chat
            with people and a lot more!
          </p>
        </div>
        <div className="m-auto w-full p-6 bg-gradient-to-r from-[#121D2D] to-[#0C111C] rounded shadow-lg">
          <h1 className="text-2xl text-white font-semibold mb-4">Login</h1>
          <form onSubmit={handleLogin}>
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
              <div className="flex flex-row items-center bg-gray-800 text-white mt-1 w-full border rounded focus:outline-none focus:ring">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="bg-transparent p-2 w-full rounded focus:outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  className="cursor-pointer p-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </div>
              </div>
            </div>
            {error && (
              <div className="text-m text-red-500 text-center mb-3">
                {error}
              </div>
            )}
            {loading ? (
              <button
                type="submit"
                className="w-full bg-blue-500 bg-opacity-50 text-white py-2 px-4 rounded"
              >
                Wait...
              </button>
            ) : (
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Login
              </button>
            )}
          </form>
          <div className="text-center text-gray-400 my-3">
            New User?
            <Link
              to="/register"
              className="text-primary hover:text-blue-700 hover:underline ml-1"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
