import styles from "./Tag.module.scss";

type Props = {
  label: string;
  bgColor: string;
};

export const Tag = ({ label, bgColor }: Props) => {
  return (
    <span className={styles.tag} style={{ backgroundColor: bgColor }}>
      {label}
    </span>
  );
};