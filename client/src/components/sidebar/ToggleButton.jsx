import { MdLightMode } from "react-icons/md";
import { RiMoonClearFill } from "react-icons/ri";
import { useTheme } from "../../hooks/ThemeContext";

const ToggleButton = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  return (
    <div
      className={`flex items-center justify-center md:justify-between rounded-full md:p-3 mx-1 hover:cursor-pointer transition-all duration-300 ${
        isDarkMode ? "bg-gray-700" : "bg-gray-200"
      }`}
      onClick={toggleDarkMode}
    >
      <div className="md:ml-2 text-xl">
        {isDarkMode ? (
          <div className="md:flex hidden text-yellow-500">Dark Mode</div>
        ) : (
          <div className="md:flex hidden text-black">Light Mode</div>
        )}
      </div>
      {isDarkMode ? (
        <div className="p-2 rounded-full w-10 h-10 bg-gray-900 flex justify-center items-center">
          <RiMoonClearFill color="orange" />
        </div>
      ) : (
        <div className="p-2 rounded-full w-10 h-10 bg-orange-500 flex justify-center items-center">
          <MdLightMode size={30} color="white" />
        </div>
      )}
    </div>
  );
};

export default ToggleButton;
