import ProfileHeader from "./ProfileHeader";
import useToken from "../../hooks/useToken";
import { Navigate } from "react-router-dom";
import FollowMore from "../rightbar/FollowMore";

export default function Profile() {
  const token = useToken();
  if (!token) return <Navigate to="/login" replace={true} />;

  return (
    <>
      <ProfileHeader />
      <FollowMore />
    </>
  );
}
