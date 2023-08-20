const TweetCardLoader = () => {
  return (
    <div className="border rounded p-3 animate-pulse mb-3">
      <div className="flex flex-row items-center justify-between mb-2">
        <div className="w-10 h-10 rounded-full-full bg-gray-300 rounded-full mr-3"></div>
        <div className="w-2/5 h-5 bg-gray-300 rounded-full"></div>
        <div className="mx-2 my-auto w-20 h-4 bg-gray-300 rounded-full"></div>
      </div>
      <div className="h-4 bg-gray-300 rounded-full"></div>
      <div className="border-t p-2 flex justify-between items-center">
        <div className="flex space-x-4 text-gray-600">
          <div className="flex items-center space-x-1 cursor-pointer">
            <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
            <p className="w-8 h-4 bg-gray-300 rounded-full"></p>
          </div>
          <div className="flex items-center space-x-1 cursor-pointer">
            <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
            <p className="w-8 h-4 bg-gray-300 rounded-full"></p>
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="flex items-center space-x-1 cursor-pointer">
            <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
            <p className="w-8 h-4 bg-gray-300 rounded-full"></p>
          </div>
          <div className="flex items-center space-x-1 cursor-pointer">
            <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
            <p className="w-8 h-4 bg-gray-300 rounded-full"></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetCardLoader;
