import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/services/hooks";
import {
  clearRead,
  markAllRead,
  selectNotifications,
} from "@/services/slices/notificationsSlice";
import styles from "@/widgets/Notifications/NotificationDropdown.module.scss";

const notificationIcon = `${import.meta.env.BASE_URL}idea.svg`;

const NotificationsPage = () => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(selectNotifications);
  const unread = notifications.filter((item) => !item.isRead);
  const read = notifications.filter((item) => item.isRead);

  const renderList = (items: typeof notifications) => items.length ? items.map((item) => (
    <div key={item.id} className={styles.item}>
      <div className={styles.itemTop}>
        <img src={notificationIcon} alt="Уведомление" className={styles.icon} />
        <div className={styles.textBlock}>
          <p className={styles.text}>{item.title}</p>
          <span className={styles.subtext}>{item.description}</span>
        </div>
        <span className={styles.date}>{new Date(item.createdAt).toLocaleDateString("ru-RU")}</span>
      </div>
      <Link to={item.route} className={styles.button}>Перейти</Link>
    </div>
  )) : <span className={styles.subtext}>Здесь пока нет уведомлений</span>;

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
      <section className={styles.section}>
        <div className={styles.header}>
          <h1 className={styles.title}>Новые уведомления</h1>
          <button type="button" className={styles.action} onClick={() => dispatch(markAllRead())} disabled={!unread.length}>
            Прочитать все
          </button>
        </div>
        <div className={styles.list}>{renderList(unread)}</div>
      </section>

      <section className={styles.section} style={{ marginTop: "40px" }}>
        <div className={styles.header}>
          <h2 className={styles.title}>Просмотренные</h2>
          <button type="button" className={styles.action} onClick={() => dispatch(clearRead())} disabled={!read.length}>
            Очистить
          </button>
        </div>
        <div className={styles.list}>{renderList(read)}</div>
      </section>
    </div>
  );
};

export default NotificationsPage;
