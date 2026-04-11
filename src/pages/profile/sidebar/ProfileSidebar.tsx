import { NavLink } from "react-router-dom";
import styles from "./ProfileSidebar.module.scss";

import IconRequests from "@/shared/image/icons/request.svg";
import IconExchanges from "@/shared/image/icons/message-text.svg";
import IconFavorites from "@/shared/image/icons/like.svg";
import IconSkills from "@/shared/image/icons/idea.svg";
import IconProfile from "@/shared/image/icons/user.svg";

const menu = [
  { to: "requests", label: "Заявки", icon: IconRequests, end: true },
  { to: "exchanges", label: "Мои обмены", icon: IconExchanges, end: true },
  { to: "favorites", label: "Избранное", icon: IconFavorites, end: true },
  { to: "skills", label: "Мои навыки", icon: IconSkills, end: true },
  { to: "", label: "Личные данные", icon: IconProfile, end: true },
] as const;

const ProfileSidebar = () => {
  return (
    <nav className={styles.navigation} aria-label="Навигация личного кабинета">
      <ul className={styles.menu}>
        {menu.map(({ to, label, icon, end }) => (
          <li key={to} className={styles.item}>
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.linkActive : ""}`
              }
            >
              <img
                src={icon}
                alt=""
                className={styles.icon}
                aria-hidden="true"
              />
              <span>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ProfileSidebar;
