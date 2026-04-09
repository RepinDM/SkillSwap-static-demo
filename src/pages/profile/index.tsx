import { Outlet } from "react-router-dom";
import ProfileSidebar from "./ProfileSidebar";

const ProfilePage = () => {
  return (
    <div className="profile-layout">
      <ProfileSidebar />
      <Outlet />
    </div>
  );
};

export default ProfilePage;