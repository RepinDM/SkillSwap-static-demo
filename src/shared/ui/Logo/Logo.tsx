import type { FC } from "react";
import styles from "./Logo.module.scss";

export const Logo: FC = () => {
  return (
    <div className={styles.logo}>
      <img className={styles.image} src="/logo.svg" alt="" />
      <span className={styles.text}>SkillSwap</span>
    </div>
  );
};
