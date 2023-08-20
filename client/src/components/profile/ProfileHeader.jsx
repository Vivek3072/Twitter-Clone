const ProfileHeader = ({ profile }) => {
  const headerStyle = {
    backgroundImage: `url(${profile.coverImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div className="bg-gray-700 rounded rounded-xl overflow-hidden">
      <div style={headerStyle} className="mx-auto rounded w-full p-4">
        <div className="h-40 mb-4"></div>
        <div className="flex items-center space-x-4">
          <img
            src={profile.avatar}
            alt="Avatar"
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
          />
          <div className="text-white">
            <h1 className="text-3xl font-semibold">{`@${profile.username}`}</h1>
            <p className="text-sm">Bio and other information</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
