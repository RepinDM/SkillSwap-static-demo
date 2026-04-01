/**
 * Компонент Footer - подвал сайта
 * 
 * Что сделано:
 * - Создана структура подвала с логотипом и копирайтом слева в колонку
 * - Справа от логотипа расположены колонки ссылок
 * - Колонка 1: "О проекте", "Все навыки"
 * - Колонка 2: "Контакты", "Блог"
 * - Колонка 3: "Политика конфиденциальности", "Пользовательское соглашение"
 * - Использован Flexbox для разметки
 * - Применены design tokens из variables.scss и light.scss
 * - Логотип ведёт на главную страницу /
 * - Ссылки "О проекте" и "Все навыки" ведут на соответствующие страницы (/about и /)
 * - Остальные ссылки являются заглушками (#)
 */

import type { FC } from "react";
import { Link } from "react-router-dom";
import { Logo } from "@/shared/ui/Logo/Logo";
import styles from "./Footer.module.scss";

export const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Левая колонка: логотип и копирайт */}
          <div className={styles.leftColumn}>
            <Link to="/" className={styles.logoLink}>
              <Logo />
            </Link>
            <div className={styles.copyright}>
              SkillSwap — 2025
            </div>
          </div>

          {/* Правая часть: колонки ссылок */}
          <div className={styles.linksSection}>
            {/* Колонка 1: О проекте, Все навыки */}
            <nav className={styles.column}>
              <ul className={styles.list}>
                <li>
                  <Link to="/about" className={styles.link}>
                    О проекте
                  </Link>
                </li>
                <li>
                  <Link to="/" className={styles.link}>
                    Все навыки
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Колонка 2: Контакты, Блог */}
            <nav className={styles.column}>
              <ul className={styles.list}>
                <li>
                  <a href="#" className={styles.link}>
                    Контакты
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.link}>
                    Блог
                  </a>
                </li>
              </ul>
            </nav>

            {/* Колонка 3: Политика конфиденциальности, Пользовательское соглашение */}
            <nav className={styles.column}>
              <ul className={styles.list}>
                <li>
                  <a href="#" className={styles.link}>
                    Политика конфиденциальности
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.link}>
                    Пользовательское соглашение
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};
