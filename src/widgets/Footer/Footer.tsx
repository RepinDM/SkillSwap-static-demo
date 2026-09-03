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
              SkillSwap — {new Date().getFullYear()}
            </div>
          </div>

          <div className={styles.linksSection}>
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

          </div>
        </div>
      </div>
    </footer>
  );
};
