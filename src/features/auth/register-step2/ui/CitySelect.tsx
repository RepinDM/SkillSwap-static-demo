import { useEffect, useMemo, useRef, useState } from "react";

import chevronDownIcon from "@/shared/image/icons/chevron-down.svg";
import chevronUpIcon from "@/shared/image/icons/chevron-up.svg";
import crossIcon from "@/shared/image/icons/cross.svg";
import styles from "@/features/auth/RegisterStep2.module.scss";
import { useAppSelector } from "@/services/hooks";
import {
  selectCities,
  selectError,
  selectStatus,
} from "@/services/slices/skillCardsSlice";

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
  const cities = useAppSelector(selectCities);
  const status = useAppSelector(selectStatus);
  const loadError = useAppSelector(selectError);
  const isLoading = status === "loading";
  const isUnavailable = status === "error" || (status === "success" && cities.length === 0);

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
    if (!normalized) return cities;

    return cities.filter((city) =>
      city.name?.toLowerCase().includes(normalized)
    );
  }, [query, cities]);

  const selectedLabel = cities.find((city) => String(city.id) === value)?.name || "Не указан";

  return (
    <div className={styles.field} ref={wrapperRef}>
      <span className={styles.label}>{label}</span>
      <button
        type="button"
        className={`${styles.trigger} ${error ? styles.triggerError : ""}`}
        disabled={isLoading || isUnavailable}
        aria-expanded={open}
        onClick={() => {
          setOpen((prev) => !prev);
          setQuery("");
        }}
      >
        <span className={!value ? styles.placeholder : ""}>{selectedLabel}</span>
        <img src={open ? chevronUpIcon : chevronDownIcon} alt="" />
      </button>
      {error && <span className={styles.errorMessage}>{error}</span>}
      {isLoading && <span className={styles.helperMessage}>Загружаем список городов...</span>}
      {isUnavailable && (
        <span className={styles.errorMessage}>
          {loadError ?? "Список городов пока недоступен. Попробуйте обновить страницу."}
        </span>
      )}

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
                key={city.id}
                type="button"
                className={styles.optionButton}
                onClick={() => {
                  onChange(String(city.id)); // ← ВАЖНО
                  setOpen(false);
                  setQuery("");
                }}
              >
                {city.name}
              </button>
            ))}
            {filteredCities.length === 0 && (
              <p className={styles.emptyMessage}>Города по вашему запросу не найдены</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
