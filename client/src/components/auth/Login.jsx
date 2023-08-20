import { useEffect, useState } from "react";
import useToken from "../../hooks/useToken";
import { Link, Navigate } from "react-router-dom";
import useApi from "../../hooks/useApi";
import AuthController from "../../api/auth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { token, setToken } = useToken();

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
      setToken(loginData.accessToken);
      window.location.replace("/");
    }
  }, [setToken, loginError, loading, networkError, loginResp, loginData]);

  if (token) return <Navigate to="/" replace={true} />;
  return (
    <>
      <div className="w-full flex flex-col h-screen bg-gray-100">
        <div className="m-auto w-[90%] md:w-96 p-6 bg-white rounded shadow-lg">
          <h1 className="text-2xl font-semibold mb-4">Login</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-700 font-medium"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && (
              <div className="text-m text-red-500 text-center mb-3">
                {error}
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring"
            >
              Login
            </button>
          </form>
          <div className="text-center my-3">
            New User?
            <Link
              to="/register"
              className="text-blue-500 hover:text-blue-700 hover:underline"
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
