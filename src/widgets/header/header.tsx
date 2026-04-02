//Сверстала хедер, добавила стили и логику выпадающего списка с навыками, реализован переход на главную при клике
// на лого, заглушка isLoggedIn аналог для залогиненного и незалогиненного юзера, можно посмотреть два варианта верстки

import styles from "./header.module.scss";
import { Logo } from "@/shared/ui/Logo/Logo";
import { Button } from "@/shared/ui/Button/Button";
import { Link } from "react-router-dom";
import moonIcon from "@/shared/image/icons/moon.svg";
import likeIcon from "@/shared/image/icons/like.svg";
import notification from "@/shared/image/icons/notification.svg";
import chevronDown from "@/shared/image/icons/chevron-down.svg";
import { NavDropdown } from "../NavDropdown/NavDropdown";
import { useState } from "react";
import { Avatar } from "@/shared/ui/Avatar/Avatar";

export const Header = () => {
  const [isLoggedIn] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

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
        <input
          placeholder="Искать навык"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className={styles.searchInput}
        ></input>
      </div>
      <div className={styles.authBlock}>
        {isLoggedIn ? (
          <div className={styles.userActions}>
            <button className={styles.iconBtn}>
              <img src={moonIcon} alt="Смена темы" />
            </button>
            <button className={styles.iconBtn}>
              <img src={likeIcon} alt="Избранное" />
            </button>
            <button className={styles.iconBtn}>
              <img src={notification} alt="Уведомления" />
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
