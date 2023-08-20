import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useApi from "../../hooks/useApi";
import AuthController from "../../api/auth";

const Registration = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const [error, setError] = useState("");

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
      // setToken(registerData.accessToken);
      window.location.replace("/login");
    }
  }, [registerError, loading, networkError, registerResp, registerData]);

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="m-auto w-[90%] md:w-96 p-6 bg-white rounded shadow-lg">
        <h1 className="text-2xl font-semibold mb-4">Registration</h1>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
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
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 font-medium"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring"
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
        <div className="text-center my-3">
          Already an User?
          <Link
            to="/login"
            className="text-blue-500 hover:text-blue-700 hover:underline"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Registration;
