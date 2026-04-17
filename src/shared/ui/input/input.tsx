import React, { forwardRef, useId } from "react";
import type { InputHTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./input.module.scss";
import type { InputType } from "./input.types";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  type?: InputType;
  label?: string;
  error?: string;
  hint?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = "text",
      label,
      error,
      hint,
      value,
      onChange,
      placeholder,
      disabled = false,
      iconLeft,
      iconRight,
      className,
      ...props
    },
    ref
  ) => {
    // useId гарантирует уникальный id для каждого инпута
    const inputId = useId();

    return (
      <>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        )}
        <div className={styles.inputContainer}>
          {iconLeft && <span className={styles.iconLeft}>{iconLeft}</span>}
          <input
            id={inputId}
            ref={ref}
            type={type}
            className={clsx(
              styles.input,
              error && styles.inputError,
              iconLeft && styles.withIconLeft,
              iconRight && styles.withIconRight,
              className,
            )}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            {...props}
          />
          {iconRight && <span className={styles.iconRight}>{iconRight}</span>}
        </div>
        {error && <span className={styles.errorText}>{error}</span>}
        {!error && hint && <span className={styles.hintText}>{hint}</span>}
      </>
    );
  }
);
