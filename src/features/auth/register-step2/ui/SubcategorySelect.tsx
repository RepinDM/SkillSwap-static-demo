import { useEffect, useMemo, useRef, useState } from "react";

import checkboxDoneIcon from "@/shared/image/icons/checkbox-done.svg";
import checkboxEmptyIcon from "@/shared/image/icons/checkbox-empty.svg";
import chevronDownIcon from "@/shared/image/icons/chevron-down.svg";
import chevronUpIcon from "@/shared/image/icons/chevron-up.svg";
import styles from "@/features/auth/RegisterStep2.module.scss";
import { useAppSelector } from "@/services/hooks";
import { selectCategoryItems } from "@/services/slices/skillCardsSlice";

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

  const availableSubcategories = useMemo(() => {
    const category = categories.find(
      (c) => c.id.toString() === categoryId
    );

    return category?.subcategories || [];
  }, [categories, categoryId]);

  const selectedLabel =
  availableSubcategories.find((item) => item.id.toString() === value)?.name || "Выберите подкатегорию";

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
              const isSelected = subcategory.id.toString() === value;

              return (
                <button
                  key={subcategory.id}
                  type="button"
                  className={styles.optionButton}
                  onClick={() => {
                    onChange(subcategory.id.toString());
                    setOpen(false);
                  }}
                >
                  <img
                    src={isSelected ? checkboxDoneIcon : checkboxEmptyIcon}
                    alt=""
                  />
                  <span>{subcategory.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
