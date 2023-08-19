import { FaHome, FaSearch, FaEnvelope, FaUser } from "react-icons/fa";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  const sidebarItems = [
    { icon: <FaHome />, text: "Home" },
    { icon: <FaSearch />, text: "Explore" },
    { icon: <FaEnvelope />, text: "Messages" },
    { icon: <FaUser />, text: "Profile" },
  ];

  return (
    <div className="h-fit md:h-full w-full flex md:flex-col flex-row overflow-x-auto w-64 shadow-sm rounded p-5">
      {sidebarItems.map((item, index) => (
        <SidebarItem key={index} icon={item.icon} text={item.text} />
      ))}
      <div className="mt-auto">
        <button
          //   onClick={onLogout}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-full w-full text-center"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;