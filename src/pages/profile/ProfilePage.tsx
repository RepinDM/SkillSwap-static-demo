import { Outlet } from "react-router-dom";
import ProfileSidebar from "./sidebar/ProfileSidebar";
import styles from './ProfilePage.module.scss';

export const ProfilePage = () => {
  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <ProfileSidebar />
      </aside>
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};
