import { FaHome, FaUserCircle, FaUsers, FaSignOutAlt } from "react-icons/fa";
import { BsFillChatTextFill } from "react-icons/bs";
import SidebarItem from "./SidebarItem";
import useToken from "../../hooks/useToken";
import Logo from "../../assets/Logo.svg";
import { Link, useLocation } from "react-router-dom";
import ToggleButton from "./ToggleButton";
import { useTheme } from "../../hooks/ThemeContext";

const Sidebar = () => {
  const { isDarkMode } = useTheme();

  const { removeToken } = useToken();
  const location = useLocation();

  const sidebarItems = [
    { icon: <FaHome />, text: "Home", linkTo: "/" },
    { icon: <FaUsers />, text: "People", linkTo: "/people" },
    {
      icon: <BsFillChatTextFill />,
      text: "Messages",
      linkTo: "/message",
    },
    { icon: <FaUserCircle />, text: "Profile", linkTo: "/profile" },
  ];
  function handleLogout(e) {
    removeToken();
    e.preventDefault();
    window.location.reload();
  }
  return (
    <div
      className={`h-fit md:h-screen w-full flex items-center md:items-start md:flex-col flex-row overflow-x-auto w-full rounded px-2 md:space-x-0`}
    >
      <div className="w-full text-xl my-2 md:my-5 space-x-1 flex flex-row items-center justify-between w-full mx-1">
        <Link to="/" className="flex flex-row items-center">
          <img src={Logo} className="w-8 h-8" alt="Logo" />
          <div className={`text-sky-500 font-bold font-mono ml-1 text-2xl`}>
            Tweeter
          </div>
        </Link>
        <div className="w-">
          <ToggleButton />
        </div>
      </div>
      <div
        className={`${
          isDarkMode ? "bg-gray-900 md:bg-gray-800" : "bg-white"
        } rounded-full md:relative fixed md:top-auto bottom-0 w-[92%] md:shadow-none drop-shadow-none drop-shadow-lg px-1 my-1 flex md:flex-col flex-row`}
      >
        {sidebarItems.map((item, index) => (
          <SidebarItem
            key={index}
            icon={item.icon}
            text={item.text}
            linkTo={item.linkTo}
            isActive={location.pathname === item.linkTo}
          />
        ))}
      </div>

      <div className="md:mt-auto md:mb-5 w-fit md:w-full">
        <button
          onClick={handleLogout}
          className="w-fit md:w-full bg-blue-500 flex felx-row items-center justify-center space-x-2 hover:bg-blue-600 text-white py-2 px-3 md:p-3 md:py-5 md:px-5 rounded-full text-center ml-auto"
        >
          <FaSignOutAlt />
          <div className="text-md md:text-xl">Logout</div>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
