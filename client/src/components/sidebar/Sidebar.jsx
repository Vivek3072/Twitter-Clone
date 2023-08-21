import { FaHome, FaUserCircle, FaUsers, FaSignOutAlt } from "react-icons/fa";
import { BsFillChatTextFill } from "react-icons/bs";
import SidebarItem from "./SidebarItem";
import useToken from "../../hooks/useToken";
import Logo from "../../assets/Logo.svg";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
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
    <div className="h-fit md:h-screen w-full flex items-center md:items-start md:flex-col flex-row overflow-x-auto w-full shadow-sm rounded px-2 md:space-x-0">
      <div className="text-xl my-5 space-x-1 flex flex-row items-center justify-center w-full">
        <img src={Logo} className="w-8 h-8" alt="Logo" />
        <div>Tweeter</div>
      </div>
      <div className="md:relative fixed md:top-auto bottom-0 w-[92%] bg-white md:shadow-none shadow-xl rounded-full px-1 my-1 flex md:flex-col flex-row">
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
      <div className="md:mt-auto md:mb-5 w-full">
        <button
          onClick={handleLogout}
          className="w-full bg-blue-500 flex felx-row items-center justify-center space-x-2 hover:bg-blue-600 text-white p-3 md:py-5 md:px-5 rounded-full w-full text-center"
        >
          <FaSignOutAlt />
          <div className="text-lg md:text-xl">Logout</div>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
