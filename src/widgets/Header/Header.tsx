//Сделано
// 1. Блок Logo - ссылка на главную страницу
// 2. Навигация с выпадающим списком навыков
// 3. Search - поиск с иконкой лупы
// 4. Две реализации правого блока: для авторизованных пользователей (иконка избранного, уведомлений, смены темы, аватар),
// для нефавторизованных (иконка смены темы, кнопки войти и зарегистрироваться)

import styles from "./Header.module.scss";
import { Logo } from "@/shared/ui/Logo/Logo";
import { Button } from "@/shared/ui/Button/Button";
import { Link } from "react-router-dom";
import clsx from "clsx";
import moonIcon from "@/shared/image/icons/moon.svg";
import sunIcon from "@/shared/image/icons/sun.svg";
import likeIcon from "@/shared/image/icons/like.svg";
import notification from "@/shared/image/icons/notification.svg";
import chevronDown from "@/shared/image/icons/chevron-down.svg";
import { NavDropdown } from "../NavDropdown/NavDropdown";
import { useRef, useState } from "react";//useMemo добавить
import { Avatar } from "@/shared/ui/Avatar/Avatar";
import { NotificationDropdown } from "../Notifications/NotificationDropdown";
import { SearchInput } from "@/features/Search/SearchInput";
import { useAppSelector } from "@/services/hooks";
import { selectSearchQuery } from "@/services/slices/skillCardsSlice";
import { selectIsAuthenticated, selectUser } from "@/services/slices/authSlice";
import { useTheme } from "@/shared/hooks/useTheme";

export const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownTriggerRef = useRef<HTMLButtonElement>(null);
  const notificationTriggerRef = useRef<HTMLButtonElement>(null);
  const { isDark, toggleTheme } = useTheme();
  const isLoggedIn = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };
  
  const searchValue = useAppSelector(selectSearchQuery);

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const themeIcon = isDark ? sunIcon : moonIcon;
  const themeButtonLabel = isDark ? "Включить светлую тему" : "Включить тёмную тему";
  
  return (
    <header className={styles.header}>
      <Link to="/">
        <Logo />
      </Link>
      <nav className={styles.navigation}>
        <Link to="/about">О проекте</Link>
        <div>
          <button
            ref={dropdownTriggerRef}
            className={styles.dropDownBtn}
            onClick={toggleDropdown}
            aria-expanded={isDropdownOpen}
            aria-label={isDropdownOpen ? "Скрыть все навыки" : "Показать все навыки"}
            type="button"
          >
            <span>Все навыки</span>
            <img
              src={chevronDown}
              alt=""
              className={clsx(styles.chevronIcon, {
                [styles.chevronIconOpen]: isDropdownOpen,
              })}
            />
          </button>
          <NavDropdown
            isOpen={isDropdownOpen}
            onClose={closeDropdown}
            triggerRef={dropdownTriggerRef}
          />
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
            <button
              className={clsx(styles.iconBtn, styles.themeButton, {
                [styles.themeButtonActive]: isDark,
              })}
              onClick={toggleTheme}
              aria-label={themeButtonLabel}
              type="button"
            >
              <img src={themeIcon} alt="" />
            </button>
            <div style={{ position: "relative" }}>
              <button
                ref={notificationTriggerRef}
                className={styles.iconBtn}
                onClick={() => setIsNotifOpen((prev) => !prev)}
                aria-expanded={isNotifOpen}
                aria-label={isNotifOpen ? "Скрыть уведомления" : "Показать уведомления"}
                type="button"
              >
                <img
                  src={notification}
                  alt="Уведомления"
                  className={styles.headerActionIcon}
                />
                <span className={styles.badge} />
              </button>
              <NotificationDropdown
                isOpen={isNotifOpen}
                onClose={() => setIsNotifOpen(false)}
                triggerRef={notificationTriggerRef}
              />
            </div>
            <Link to="/profile/favorites" className={styles.iconBtn}>
              <img
                src={likeIcon}
                alt="Избранное"
                className={styles.headerActionIcon}
              />
            </Link>
            <Link to="/profile" className={styles.userInfo}>
              <span className={styles.userName}>{user?.name}</span>
              <Avatar src={user?.avatar} />
            </Link>
          </div>
        ) : (
          <>
            <button
              className={clsx(styles.iconBtn, styles.themeButton, {
                [styles.themeButtonActive]: isDark,
              })}
              onClick={toggleTheme}
              aria-label={themeButtonLabel}
              type="button"
            >
              <img src={themeIcon} alt="" />
            </button>
            <div className={styles.authButtons}>
              <Link to="/login">
                <Button variant="secondary">Войти</Button>
              </Link>
              <Link to="/register">
                <Button variant="primary">Регистрация</Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </header>
  );
};
