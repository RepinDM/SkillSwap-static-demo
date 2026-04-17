import type { FC, RefObject } from "react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./NotificationDropdown.module.scss";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
}

const mockNew = [
  {
    id: 1,
    text: "Николай принял ваш обмен",
    subtext: "Перейдите в профиль, чтобы обсудить детали",
    date: "сегодня",
  },
  {
    id: 2,
    text: "Татьяна предлагает вам обмен",
    subtext: "Примите обмен, чтобы обсудить детали",
    date: "сегодня",
  },
];

const mockSeen = [
  {
    id: 3,
    text: "Олег предлагает вам обмен",
    subtext: "Примите обмен, чтобы обсудить детали",
    date: "вчера",
  },
  {
    id: 4,
    text: "Игорь принял ваш обмен",
    subtext: "Перейдите в профиль, чтобы обсудить детали",
    date: "23 мая",
  },
];

export const NotificationDropdown: FC<Props> = ({ isOpen, onClose, triggerRef }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      // Игнорируем клик по самой кнопке-колокольчику, чтобы она работала как toggle.
      if (triggerRef.current?.contains(target)) {
        return;
      }

      if (ref.current && !ref.current.contains(target)) {
       onClose();
      }
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  return (
    <div className={styles.dropdown} ref={ref}>
      <div className={styles.section}>
        <div className={styles.header}>
          <span className={styles.title}>Новые уведомления</span>
          <button type="button" className={styles.action}>
            Прочитать все
          </button>
        </div>

        <div className={styles.list}>
          {mockNew.map((item) => (
            <div key={item.id} className={styles.item}>
              <div className={styles.itemTop}>
                <img src="/idea.svg" alt="Уведомление" className={styles.icon} />

                <div className={styles.textBlock}>
                  <p className={styles.text}>{item.text}</p>
                  <span className={styles.subtext}>{item.subtext}</span>
                </div>

                <span className={styles.date}>{item.date}</span>
              </div>

              <button type="button" className={styles.button}>
                Перейти
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.header}>
          <span className={styles.title}>Просмотренные</span>
          <button type="button" className={styles.action}>
            Очистить
          </button>
        </div>

        <div className={styles.list}>
          {mockSeen.map((item) => (
            <div key={item.id} className={styles.item}>
              <div className={styles.itemTop}>
                <img src="/idea.svg" alt="Уведомление" className={styles.icon} />

                <div className={styles.textBlock}>
                  <p className={styles.text}>{item.text}</p>
                  <span className={styles.subtext}>{item.subtext}</span>
                </div>

                <span className={styles.date}>{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Link to="/notifications" className={styles.footerLink} onClick={onClose}>
        Смотреть все уведомления
      </Link>
    </div>
  );
};
