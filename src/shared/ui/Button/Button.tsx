import { type FC, type MouseEventHandler, type ReactNode } from "react";
import styles from "./Button.module.scss";
import clsx from "clsx";

interface ButtonProps {
  className?: string;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  variant?: "primary" | "secondary" | "tertiary";
  disabled?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  type?: "button" | "submit" | "reset";
}

export const Button: FC<ButtonProps> = ({
  className,
  children,
  onClick,
  variant = "primary",
  disabled = false,
  iconLeft,
  iconRight,
  type = "button"
}) => {
  return (
    <button
      type={type}
      className={clsx(styles.button, styles[variant], className)}
      onClick={onClick}
      disabled={disabled}
    >
      {iconLeft && <span className={styles.iconLeft}>{iconLeft}</span>}
      {children}
      {iconRight && <span className={styles.iconRight}>{iconRight}</span>}
    </button>
  );
};
