import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.svg";

const ErrorPage = () => {
  return (
    <div className="bg-gray-800 text-white grid grid-cols-1 md:grid-cols-2 px-2 md:px-15 h-screen items-center justify-center m-auto">
      <div className="py-5">
        <img
          src={Logo}
          alt="404 Illustration"
          className="w-30 md:w-50 mx-auto mb-6"
        />
      </div>
      <div className="flex items-start md:items-center flex-col justify-center">
        <h1 className="text-center text-[5rem] md:text-[10rem] font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-blue-500 w-full">
          404
        </h1>
        <div className="text-4xl font-medium text-center mb-2">
          Oops! Page Not Found
        </div>
        <p className="text-gray-400 mb-4">
          The page you are looking for doesn&apos;t exist.
        </p>
        <Link
          to="/"
          className="w-fit mx-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
        >
          Go back to Tweeter
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
