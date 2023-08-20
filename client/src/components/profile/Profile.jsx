import TweetCardLoader from "../loader/TweetCardLoader";
import ProfileHeader from "./ProfileHeader";

export default function Profile() {
  const profile = {
    username: "john_doe",
    avatar: "https://avatars.dicebear.com/api/identicon/john_doe.svg",
    coverImage:
      "https://images.unsplash.com/photo-1614850715649-1d0106293bd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFja2dyb3VuZCUyMGNvdmVyfGVufDB8fDB8fHww&w=1000&q=80",
  };

  return (
    <div>
      <ProfileHeader profile={profile} />
      <div className="my-5">
        <TweetCardLoader />
        <TweetCardLoader />
      </div>
    </div>
  );
}
