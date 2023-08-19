const SidebarItem = ({ icon, text }) => {
  return (
    <div className="mx-1 flex items-center space-x-3 pl-4 py-3 cursor-pointer text-gray-700 hover:bg-blue-50 hover:rounded-full hover:text-blue-500">
      <span className="text-xl">{icon}</span>
      <span className="text-base font-medium">{text}</span>
    </div>
  );
};

export default SidebarItem;
