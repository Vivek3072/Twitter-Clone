import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/ThemeContext";

const SidebarItem = ({ icon, text, linkTo, isActive }) => {
  const { isDarkMode } = useTheme();
  return (
    <Link
      to={linkTo}
      className={`w-full flex flex-col md:flex-row items-center justify-center md:justify-start md:space-x-2 md:pl-3 py-3 md:py-4 cursor-pointer text-gray-500 my-1 hover:rounded-full hover:text-blue-500 ${
        isDarkMode ? "bg-gray-900 md:bg-gray-800 rounded-full" : "bg-white"
      } ${
        isActive &&
        "text-blue-500 md:drop-shadow-lg md:shadow-black-500 rounded-full"
      }`}
    >
      <div className={`text-base md:text-xl ${isActive && "text-blue-500"}`}>
        {icon}
      </div>
      <div
        className={`text-sm md:text-base font-medium ${
          isActive && "text-blue-500"
        }`}
      >
        {text}
      </div>
    </Link>
  );
};

export default SidebarItem;
