const UserLoader = () => {
  return (
    <div className="flex flex-row items-center w-full border rounded p-3 animate-pulse mb-3">
      <div className="w-full flex flex-col items-start justify-between mb-2">
        <div className="w-1/6 h-5 bg-gray-300 rounded-full my-1"></div>
        <div className="my-auto w-2/6  h-4 bg-gray-300 rounded-full my-1"></div>
      </div>
      <div className="w-1/5 h-8 bg-gray-300 rounded-full"></div>
    </div>
  );
};

export default UserLoader;
