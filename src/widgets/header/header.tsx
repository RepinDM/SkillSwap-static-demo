//Сделано
// 1. Блок Logo - ссылка на главную страницу
// 2. Навигация с выпадающим списком навыков
// 3. Search - поиск с иконкой лупы
// 4. Две реализации правого блока: для авторизованных пользователей (иконка избранного, уведомлений, смены темы, аватар),
// для нефавторизованных (иконка смены темы, кнопки войти и зарегистрироваться)

import styles from "./header.module.scss";
import { Logo } from "@/shared/ui/Logo/Logo";
import { Button } from "@/shared/ui/Button/Button";
import { Link } from "react-router-dom";
import moonIcon from "@/shared/image/icons/moon.svg";
import likeIcon from "@/shared/image/icons/like.svg";
import notification from "@/shared/image/icons/notification.svg";
import chevronDown from "@/shared/image/icons/chevron-down.svg";
import { NavDropdown } from "../NavDropdown/NavDropdown";
import { useState } from "react";//useMemo добавить
import { Avatar } from "@/shared/ui/Avatar/Avatar";
import { NotificationDropdown } from "../Notifications/NotificationDropdown";
import { SearchInput } from "@/features/Search/SearchInput";
import { useAppSelector } from "@/services/hooks";
import { selectSearchQuery } from "@/services/slices/skillCardsSlice";

export const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn] = useState(true);
  //
  // const isLoggedIn = useMemo(() => {
  //   if (typeof window === "undefined") return false;
  //
  //   return Boolean(
  //     localStorage.getItem("token") || localStorage.getItem("registrationComplete")
  //   );
  // }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };
  
  const searchValue = useAppSelector(selectSearchQuery);

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  
  return (
    <header className={styles.header}>
      <Link to="/">
        <Logo />
      </Link>
      <nav className={styles.navigation}>
        <Link to="/about">О проекте</Link>
        <div>
          <button
            className={styles.dropDownBtn}
            onClick={toggleDropdown}
            aria-expanded={isDropdownOpen}
          >
            <span>Все навыки</span>
            <img src={chevronDown} alt="Стрелка вниз"></img>
          </button>
          <NavDropdown isOpen={isDropdownOpen} onClose={closeDropdown} />
        </div>
      </nav>
      <div className={styles.searchWrapper}>
        <div className={styles.searchIcon} />
        <SearchInput
            className={styles.searchInput}
            placeholder="Искать навык"
            value={searchValue}
        />
      </div>
      <div className={styles.authBlock}>
        {isLoggedIn ? (
          <div className={styles.userActions}>
            <button className={styles.iconBtn}>
              <img src={moonIcon} alt="Смена темы" />
            </button>
            <div style={{ position: "relative" }}>
              <button className={styles.iconBtn} onClick={() => setIsNotifOpen((prev) => !prev)}>
                <img src={notification} alt="Уведомления" />
                {isLoggedIn && <span className={styles.badge} />}
              </button>
              <NotificationDropdown isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)}/>
            </div>
            <button className={styles.iconBtn}>
              <img src={likeIcon} alt="Избранное" />
            </button>
            <Avatar />
          </div>
        ) : (
          <>
            <button className={styles.iconBtn}>
              <img src={moonIcon} alt="Смена темы" />
            </button>
            <div className={styles.authButtons}>
              <Button variant="secondary">Войти</Button>
              <Button variant="primary">Регистрация</Button>
            </div>
          </>
        )}
      </div>
    </header>
  );
};
