import React from "react";
import type { InputHTMLAttributes } from "react";
import styles from "./input.module.scss";
import type { InputType } from "./input.types";

interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "onChange"
> {
  type?: InputType;
  label?: string;
  error?: string;
  hint?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const Input = ({
  type = "text",
  label,
  error,
  hint,
  value,
  onChange,
  placeholder,
  disabled = false,
  ...props
}: InputProps) => {
  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}
      <input
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
    </div>
  );
};
