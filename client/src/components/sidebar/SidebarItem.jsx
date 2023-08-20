import { Link } from "react-router-dom";

const SidebarItem = ({ icon, text, linkTo }) => {
  return (
    <Link
      to={linkTo}
      className="w-full flex items-center space-x-1 pl-3 py-3 cursor-pointer text-gray-700 hover:bg-blue-50 hover:rounded-full hover:text-blue-500"
    >
      <span className="text-xl">{icon}</span>
      <span className="text-base font-medium">{text}</span>
    </Link>
  );
};

export default SidebarItem;
