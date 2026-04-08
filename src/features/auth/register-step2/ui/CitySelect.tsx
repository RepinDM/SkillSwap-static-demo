import { useEffect, useMemo, useRef, useState } from "react";

import chevronDownIcon from "@/shared/image/icons/chevron-down.svg";
import chevronUpIcon from "@/shared/image/icons/chevron-up.svg";
import crossIcon from "@/shared/image/icons/cross.svg";
import styles from "@/features/auth/RegisterStep2.module.scss";
import { CITIES } from "@/features/auth/register-step2/options";

type CitySelectProps = {
  error?: string;
  label: string;
  onChange: (value: string) => void;
  value: string;
};

export const CitySelect = ({ error, label, onChange, value }: CitySelectProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const filteredCities = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return CITIES;

    return CITIES.filter((city) => city.label.toLowerCase().includes(normalized));
  }, [query]);

  const selectedLabel =
    CITIES.find((item) => item.value === value)?.label || "Не указан";

  return (
    <div className={styles.field} ref={wrapperRef}>
      <span className={styles.label}>{label}</span>
      <button
        type="button"
        className={`${styles.trigger} ${error ? styles.triggerError : ""}`}
        onClick={() => {
          setOpen((prev) => !prev);
          setQuery("");
        }}
      >
        <span className={!value ? styles.placeholder : ""}>{selectedLabel}</span>
        <img src={open ? chevronUpIcon : chevronDownIcon} alt="" />
      </button>
      {error && <span className={styles.errorMessage}>{error}</span>}

      {open && (
        <div className={`${styles.dropdownPanel} ${styles.cityPanel}`}>
          <div className={styles.searchRow}>
            <input
              className={styles.searchInput}
              placeholder="Поиск города"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            {query && (
              <button
                type="button"
                className={styles.clearButton}
                onClick={() => setQuery("")}
                aria-label="Очистить поиск"
              >
                <img src={crossIcon} alt="" />
              </button>
            )}
          </div>

          <div className={styles.optionsList}>
            {filteredCities.map((city) => (
              <button
                key={city.value}
                type="button"
                className={styles.optionButton}
                onClick={() => {
                  onChange(city.value);
                  setOpen(false);
                  setQuery("");
                }}
              >
                {city.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
