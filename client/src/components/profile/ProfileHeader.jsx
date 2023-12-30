import { useState, useContext } from "react";
import { HiPencil } from "react-icons/hi";
import Avatars from "./Avatars";
import { IoClose } from "react-icons/io5";
import UserContext from "../../hooks/UserContext";

const ProfileHeader = () => {
  const [avatarPopup, setAvatarPopup] = useState(false);
  const { userData } = useContext(UserContext);

  const { username, email, profilePic } = userData;

  const coverImage =
    "https://images.unsplash.com/photo-1614850715649-1d0106293bd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFja2dyb3VuZCUyMGNvdmVyfGVufDB8fDB8fHww&w=1000&q=80";
  const headerStyle = {
    backgroundImage: `url(${coverImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <>
      <div className="relative bg-gray-700 rounded rounded-xl overflow- mt-3">
        <div style={headerStyle} className="mx-auto rounded w-full p-4">
          <div className="h-40 mb-4"></div>
          <div className="flex items-center space-x-4">
            <img
              src={profilePic}
              alt="Avatar"
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
            />

            <div
              className="w-fit bg-gray-900 p-2 rounded-full absolute left-16 bottom-4 z-10 transition-all duration-300 hover:cursor-pointer"
              onClick={() => setAvatarPopup(!avatarPopup)}
            >
              {!avatarPopup ? (
                <HiPencil color="white" size={20} />
              ) : (
                <IoClose color="white" size={20} />
              )}
            </div>
            <div className="text-white">
              <h1 className="text-3xl font-semibold">{`@${username}`}</h1>
              <p className="text-sm">{email}</p>
            </div>
          </div>
        </div>
        {avatarPopup && (
          <Avatars username={username} setAvatarPopup={setAvatarPopup} />
        )}
      </div>
    </>
  );
};

export default ProfileHeader;
