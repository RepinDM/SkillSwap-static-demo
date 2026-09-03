import type { FC, RefObject } from "react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/services/hooks";
import {
  clearRead,
  markAllRead,
  selectNotifications,
} from "@/services/slices/notificationsSlice";
import styles from "./NotificationDropdown.module.scss";

const notificationIcon = `${import.meta.env.BASE_URL}idea.svg`;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
}

export const NotificationDropdown: FC<Props> = ({ isOpen, onClose, triggerRef }) => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(selectNotifications);
  const unread = notifications.filter((item) => !item.isRead);
  const read = notifications.filter((item) => item.isRead);

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
          <button type="button" className={styles.action} onClick={() => dispatch(markAllRead())} disabled={!unread.length}>
            Прочитать все
          </button>
        </div>

        <div className={styles.list}>
          {unread.length ? unread.map((item) => (
            <div key={item.id} className={styles.item}>
              <div className={styles.itemTop}>
                <img src={notificationIcon} alt="Уведомление" className={styles.icon} />

                <div className={styles.textBlock}>
                  <p className={styles.text}>{item.title}</p>
                  <span className={styles.subtext}>{item.description}</span>
                </div>

                <span className={styles.date}>{new Date(item.createdAt).toLocaleDateString("ru-RU")}</span>
              </div>

              <Link to={item.route} className={styles.button} onClick={onClose}>Перейти</Link>
            </div>
          )) : <span className={styles.subtext}>Новых уведомлений нет</span>}
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.header}>
          <span className={styles.title}>Просмотренные</span>
          <button type="button" className={styles.action} onClick={() => dispatch(clearRead())} disabled={!read.length}>
            Очистить
          </button>
        </div>

        <div className={styles.list}>
          {read.map((item) => (
            <div key={item.id} className={styles.item}>
              <div className={styles.itemTop}>
                <img src={notificationIcon} alt="Уведомление" className={styles.icon} />

                <div className={styles.textBlock}>
                  <p className={styles.text}>{item.title}</p>
                  <span className={styles.subtext}>{item.description}</span>
                </div>

                <span className={styles.date}>{new Date(item.createdAt).toLocaleDateString("ru-RU")}</span>
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
