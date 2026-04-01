import styles from "./header.module.scss";
import { Logo } from "../../shared/ui/Logo/Logo";
import { Button } from "../../shared/ui/Button/Button";
import { Avatar } from "../../shared/ui/Avatar/Avatar";
import { Link } from "react-router-dom";
import moonIcon from "../../shared/image/icons/moon.svg";
import likeIcon from "../../shared/image/icons/like.svg";
import notification from "../../shared/image/icons/notification.svg";

export const Header = () => {
  const isLoggedIn = true;

  return (
    <header className={styles.header}>
      <Link to="/">
        <Logo />
      </Link>
      <nav className={styles.nav}>
        <Link to="/about" className={styles.navLink}>
          О проекте
        </Link>
        <Link to="/skills" className={styles.navLink}>
          Все навыки
        </Link>
      </nav>
      <input></input>
      <div className={styles.rightBlock}>
        {isLoggedIn ? (
          <div className={styles.userActions}>
            <button className={styles.iconBtn}>
              <img src={moonIcon} alt="Иконка смена темы" />
            </button>
            <button className={styles.iconBtn}>
              <img src={likeIcon} alt="Иконка избранного" />
            </button>
            <button className={styles.iconBtn}>
              <img src={notification} alt="Иконка уведомлений" />
            </button>
            <Avatar />
          </div>
        ) : (
          <div className={styles.authButtons}>
            <Button variant="secondary">Войти</Button>
            <Button variant="primary">Регистрация</Button>
          </div>
        )}
      </div>
    </header>
  );
};
