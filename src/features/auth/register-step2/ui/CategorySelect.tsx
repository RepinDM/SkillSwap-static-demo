import { useEffect, useRef, useState } from "react";

import checkboxDoneIcon from "@/shared/image/icons/checkbox-done.svg";
import checkboxEmptyIcon from "@/shared/image/icons/checkbox-empty.svg";
import chevronDownIcon from "@/shared/image/icons/chevron-down.svg";
import chevronUpIcon from "@/shared/image/icons/chevron-up.svg";
import styles from "@/features/auth/RegisterStep2.module.scss";
import { useAppSelector } from "@/services/hooks";
import { selectCategoryItems } from "@/services/slices/skillCardsSlice";

type CategorySelectProps = {
  error?: string;
  label: string;
  onChange: (value: string) => void;
  onResetSubcategory: () => void;
  value: string;
};

export const CategorySelect = ({
  error,
  label,
  onChange,
  onResetSubcategory,
  value,
}: CategorySelectProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const categories = useAppSelector(selectCategoryItems);

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
  categories.find((item) => item.id.toString() === value)?.name || "Выберите категорию";

  return (
    <div className={styles.field} ref={wrapperRef}>
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
        <div className={styles.dropdownPanel}>
          <div className={styles.optionsList}>
            {categories.map((category) => {
              const isSelected = category.id.toString() === value;

              return (
                <button
                  key={category.id}
                  type="button"
                  className={styles.optionButton}
                  onClick={() => {
                    onChange(category.id.toString());
                    onResetSubcategory();
                    setOpen(false);
                  }}
                >
                  <img
                    src={isSelected ? checkboxDoneIcon : checkboxEmptyIcon}
                    alt=""
                  />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
