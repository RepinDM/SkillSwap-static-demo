import { useEffect, useRef, useState } from "react";

import chevronDownIcon from "@/shared/image/icons/chevron-down.svg";
import chevronUpIcon from "@/shared/image/icons/chevron-up.svg";
import styles from "@/features/auth/RegisterStep2.module.scss";
import { GENDERS } from "@/features/auth/register-step2/options";

type GenderSelectProps = {
  error?: string;
  label: string;
  onChange: (value: string) => void;
  value: string;
};

export const GenderSelect = ({
  error,
  label,
  onChange,
  value,
}: GenderSelectProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const selectedLabel =
    GENDERS.find((item) => item.value === value)?.label || "Не указан";

  return (
    <div className={styles.fieldHalf} ref={wrapperRef}>
      <span className={styles.label}>{label}</span>
      <button
        type="button"
        className={`${styles.trigger} ${error ? styles.triggerError : ""}`}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className={!value ? styles.placeholder : ""}>{selectedLabel}</span>
        <img src={open ? chevronUpIcon : chevronDownIcon} alt="" />
      </button>
      {error && <span className={styles.errorMessage}>{error}</span>}

      {open && (
        <div className={`${styles.dropdownPanel} ${styles.smallPanel}`}>
          {GENDERS.map((gender) => (
            <button
              key={gender.value || "empty"}
              type="button"
              className={styles.optionButton}
              onClick={() => {
                onChange(gender.value);
                setOpen(false);
              }}
            >
              {gender.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
