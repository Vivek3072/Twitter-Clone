import { MdLightMode } from "react-icons/md";
import { RiMoonClearFill } from "react-icons/ri";
import { useTheme } from "../../hooks/ThemeContext";

const ToggleButton = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  return (
    <div
      className="hover:cursor-pointer drop-shadow-lg"
      onClick={toggleDarkMode}
    >
      {isDarkMode ? (
        <div className="p-2 rounded-full w-10 h-10 bg-gray-700 flex justify-center items-center">
          <RiMoonClearFill color="white" />
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
