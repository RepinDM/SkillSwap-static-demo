import { useEffect, useMemo, useRef, useState } from "react";

import checkboxDoneIcon from "@/shared/image/icons/checkbox-done.svg";
import checkboxEmptyIcon from "@/shared/image/icons/checkbox-empty.svg";
import chevronDownIcon from "@/shared/image/icons/chevron-down.svg";
import chevronUpIcon from "@/shared/image/icons/chevron-up.svg";
import styles from "@/features/auth/RegisterStep2.module.scss";
import { SUBCATEGORIES } from "@/features/auth/register-step2/options";

type SubcategorySelectProps = {
  categoryId: string;
  error?: string;
  label: string;
  onChange: (value: string) => void;
  showError: boolean;
  value: string;
};

export const SubcategorySelect = ({
  categoryId,
  error,
  label,
  onChange,
  showError,
  value,
}: SubcategorySelectProps) => {
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

  const availableSubcategories = useMemo(
    () => SUBCATEGORIES[categoryId || ""] || [],
    [categoryId]
  );

  const selectedLabel =
    availableSubcategories.find((item) => item.value === value)?.label ||
    "Выберите подкатегорию";

  return (
    <div className={styles.field} ref={wrapperRef}>
      <span className={styles.label}>{label}</span>
      <button
        type="button"
        className={`${styles.trigger} ${showError ? styles.triggerError : ""}`}
        onClick={() => {
          if (!categoryId) return;
          setOpen((prev) => !prev);
        }}
        disabled={!categoryId}
      >
        <span className={!value ? styles.placeholder : ""}>{selectedLabel}</span>
        <img src={open ? chevronUpIcon : chevronDownIcon} alt="" />
      </button>
      {showError && <span className={styles.errorMessage}>{error}</span>}

      {open && (
        <div className={styles.dropdownPanel}>
          <div className={styles.optionsList}>
            {availableSubcategories.map((subcategory) => {
              const isSelected = subcategory.value === value;

              return (
                <button
                  key={subcategory.value}
                  type="button"
                  className={styles.optionButton}
                  onClick={() => {
                    onChange(subcategory.value);
                    setOpen(false);
                  }}
                >
                  <img
                    src={isSelected ? checkboxDoneIcon : checkboxEmptyIcon}
                    alt=""
                  />
                  <span>{subcategory.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
