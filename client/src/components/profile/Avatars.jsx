import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { PROFILE_ICON_URL } from "../../api/BaseURL";
import AuthController from "../../api/controllers/auth";
import useApi from "../../hooks/useApi";
import UserContext from "../../hooks/UserContext";
import Toast from "../utils/Toast";

export default function Avatars({ username, setAvatarPopup }) {
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [showToast, setShowToast] = useState(false);

  const { setUserData } = useContext(UserContext);

  //section to close the popup when user clicks outside of the avatar component
  const ref = useRef(null);
  const handleClickOutside = useCallback(
    (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setAvatarPopup(false);
      }
    },
    [setAvatarPopup]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const imageUrls = [];

  for (let i = 1; i < 15; i++) {
    let img = `${PROFILE_ICON_URL}/${i}.jpg`;
    imageUrls.push(img);
  }
  const {
    res: resp,
    data,
    error: fetchError,
    loading,
    networkError,
    request: updatePicture,
  } = useApi(AuthController.updatePicture);

  const handlePictureUpdate = async () => {
    try {
      await updatePicture({ username: username, profilePic: selectedAvatar });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!networkError && !fetchError && resp && data && !loading) {
      setUserData((prevUser) => ({
        ...prevUser,
        profilePic: selectedAvatar,
      }));
      setAvatarPopup(false);
      setShowToast(true);
    }
  }, [
    showToast,
    setUserData,
    selectedAvatar,
    networkError,
    fetchError,
    resp,
    data,
    loading,
    setAvatarPopup,
  ]);

  return (
    <>
      <div
        ref={ref}
        className="h-fit z-10 bg-white p-3 mx-2 rounded absolute shadow-xl"
      >
        <div className="text-xl text-center my-1 px-3">Select your avatar</div>
        <div className=" flex flex-wrap items-center justify-center ">
          {imageUrls &&
            imageUrls.map((avatarPic, idx) => {
              return (
                <div
                  key={idx}
                  className={`${
                    selectedAvatar === avatarPic
                      ? "border-primary border-2 transform scale-105 shadow-lg"
                      : "border-2 border-orange-400"
                  } transition-all duration-300 w-fit h-fit rounded-full m-2 hover:cursor-pointer hover:shadow-lg`}
                  onClick={() => {
                    setSelectedAvatar(avatarPic);
                  }}
                >
                  <img
                    src={avatarPic}
                    alt="Picture"
                    className="w-14 h-14 md:w-16 md:h-16 rounded-full"
                  />
                </div>
              );
            })}
        </div>
        <div className="w-full flex flex-row justify-center py-2 mt-2 mb-3 border-t-2">
          <button
            className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-2 rounded shadow mx-2"
            onClick={() => setAvatarPopup(false)}
          >
            Cancel
          </button>
          <button
            className="bg-primary hover:bg-primaryDark text-white px-3 py-2 rounded shadow mx-2"
            onClick={handlePictureUpdate}
          >
            Update
          </button>
        </div>
      </div>
      {showToast && (
        <Toast message={"Picture Updated Successfully!"} type="success" />
      )}
    </>
  );
}
