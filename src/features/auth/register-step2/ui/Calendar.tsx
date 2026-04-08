import { useEffect, useMemo, useRef, useState } from "react";

import calendarIcon from "@/shared/image/icons/calendar.svg";
import styles from "@/features/auth/RegisterStep2.module.scss";
import { Button } from "@/shared/ui/Button/Button";

const WEEK_DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const MONTHS = [
  "январь",
  "февраль",
  "март",
  "апрель",
  "май",
  "июнь",
  "июль",
  "август",
  "сентябрь",
  "октябрь",
  "ноябрь",
  "декабрь",
];

type CalendarProps = {
  error?: string;
  label: string;
  onChange: (value: string) => void;
  value: string;
};

const formatDateLabel = (value: string) => {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

const toInputDateValue = (date: Date) => {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
};

const isSameDay = (a: Date | null, b: Date) => {
  if (!a) return false;

  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  );
};

const buildCalendarDays = (monthDate: Date) => {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const mondayStart = (firstDay.getDay() + 6) % 7;
  const startDate = new Date(year, month, 1 - mondayStart);

  return Array.from({ length: 42 }, (_, index) => {
    const current = new Date(startDate);
    current.setDate(startDate.getDate() + index);
    return current;
  });
};

export const Calendar = ({ error, label, onChange, value }: CalendarProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [draftDate, setDraftDate] = useState<Date | null>(null);
  const [calendarMonth, setCalendarMonth] = useState(new Date(2000, 3, 1));

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const calendarDays = useMemo(
    () => buildCalendarDays(calendarMonth),
    [calendarMonth]
  );

  const yearOptions = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 81 }, (_, index) => String(currentYear - index));
  }, []);

  const toggleCalendar = () => {
    setOpen((prev) => {
      const nextOpen = !prev;

      if (nextOpen) {
        const initialDate = value ? new Date(value) : new Date(2000, 3, 27);
        setDraftDate(initialDate);
        setCalendarMonth(initialDate);
      }

      return nextOpen;
    });
  };

  return (
    <div className={styles.fieldHalf} ref={wrapperRef}>
      <span className={styles.label}>{label}</span>
      <button
        type="button"
        className={`${styles.trigger} ${error ? styles.triggerError : ""}`}
        onClick={toggleCalendar}
      >
        <span className={!value ? styles.placeholder : ""}>
          {value ? formatDateLabel(value) : "дд.мм.гггг"}
        </span>
        <img src={calendarIcon} alt="" />
      </button>
      {error && <span className={styles.errorMessage}>{error}</span>}

      {open && (
        <div className={`${styles.dropdownPanel} ${styles.datePanel}`}>
          <div className={styles.calendarHeader}>
            <select
              className={styles.calendarSelect}
              value={calendarMonth.getMonth()}
              onChange={(event) =>
                setCalendarMonth(
                  new Date(
                    calendarMonth.getFullYear(),
                    Number(event.target.value),
                    1
                  )
                )
              }
            >
              {MONTHS.map((month, index) => (
                <option key={month} value={index}>
                  {month}
                </option>
              ))}
            </select>

            <select
              className={styles.calendarSelect}
              value={calendarMonth.getFullYear()}
              onChange={(event) =>
                setCalendarMonth(
                  new Date(
                    Number(event.target.value),
                    calendarMonth.getMonth(),
                    1
                  )
                )
              }
            >
              {yearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.weekDays}>
            {WEEK_DAYS.map((day) => (
              <span key={day} className={styles.weekDay}>
                {day}
              </span>
            ))}
          </div>

          <div className={styles.daysGrid}>
            {calendarDays.map((day) => {
              const isCurrentMonth = day.getMonth() === calendarMonth.getMonth();
              return (
                <button
                  key={day.toISOString()}
                  type="button"
                  className={`${styles.dayCell} ${
                    !isCurrentMonth ? styles.dayMuted : ""
                  } ${isSameDay(draftDate, day) ? styles.daySelected : ""}`}
                  onClick={() => setDraftDate(day)}
                >
                  {day.getDate()}
                </button>
              );
            })}
          </div>

          <div className={styles.calendarActions}>
            <Button
              variant="secondary"
              onClick={() => {
                setDraftDate(value ? new Date(value) : null);
                setOpen(false);
              }}
            >
              Отменить
            </Button>
            <Button
              onClick={() => {
                if (draftDate) {
                  onChange(toInputDateValue(draftDate));
                }
                setOpen(false);
              }}
            >
              Выбрать
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
