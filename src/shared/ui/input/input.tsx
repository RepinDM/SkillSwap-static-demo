import React, { forwardRef, useId } from "react";
import type { InputHTMLAttributes } from "react";
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
        <input
          id={inputId}
          ref={ref}
          type={type}
          className={`${styles.input} ${error ? styles.inputError : ""}`}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          {...props}
        />
        {error && <span className={styles.errorText}>{error}</span>}
        {!error && hint && <span className={styles.hintText}>{hint}</span>}
      </>
    );
  }
);