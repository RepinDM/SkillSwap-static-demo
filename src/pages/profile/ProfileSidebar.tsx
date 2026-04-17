import { NavLink } from "react-router-dom";
import styles from "./ProfileSidebar.module.scss";
import requestIcon from "@/shared/image/icons/request.svg";
import exchangeIcon from "@/shared/image/icons/message-text.svg";
import favoriteIcon from "@/shared/image/icons/like.svg";
import skillIcon from "@/shared/image/icons/idea.svg";
import personalIcon from "@/shared/image/icons/user.svg";
import LogoutButton from "@/features/auth/logout/LogoutButton";

const navItems = [
  { to: "requests", label: "Заявки", icon: requestIcon, end: false },
  { to: "exchanges", label: "Мои обмены", icon: exchangeIcon, end: false },
  { to: "favorites", label: "Избранное", icon: favoriteIcon, end: false },
  { to: "skills", label: "Мои навыки", icon: skillIcon, end: false },
  { to: "/profile", label: "Личные данные", icon: personalIcon, end: true },
];

const ProfileSidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.linkActive}` : styles.link
            }
          >
            <img src={item.icon} alt="" className={styles.icon} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className={styles.logout}>
        <LogoutButton />
      </div>
    </aside>
  );
};

export default ProfileSidebar;
