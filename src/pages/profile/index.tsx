import { Outlet } from "react-router-dom";
import ProfileSidebar from "./ProfileSidebar";
import styles from "./ProfilePage.module.scss";

const ProfilePage = () => {
  return (
    <div className={styles.page}>
      <ProfileSidebar />
      <section className={styles.content}>
        <Outlet />
      </section>
    </div>
  );
};

export default ProfilePage;
