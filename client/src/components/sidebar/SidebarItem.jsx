import { Link } from "react-router-dom";

const SidebarItem = ({ icon, text, linkTo, isActive }) => {
  return (
    <Link
      to={linkTo}
      className={`w-full flex items-center space-x-2 pl-3 py-4 cursor-pointer text-gray-700 hover:bg-blue-50 my-1 hover:rounded-full hover:text-blue-500 ${
        isActive && "text-blue-500 bg-blue-50 rounded-full"
      }`}
    >
      <span className={`text-xl ${isActive && "text-blue-500"}`}>{icon}</span>
      <span className={`text-base font-medium ${isActive && "text-blue-500"}`}>
        {text}
      </span>
    </Link>
  );
};

export default SidebarItem;
