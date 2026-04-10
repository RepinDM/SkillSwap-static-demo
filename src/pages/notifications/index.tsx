import styles from "@/widgets/Notifications/NotificationDropdown.module.scss";
import bulb from "@/shared/image/light/light-bulb.png";

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

const NotificationsPage = () => {
  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
      
      <div className={styles.section}>
        <div className={styles.header}>
          <span className={styles.title}>Новые уведомления</span>
          <span className={styles.action}>Прочитать все</span>
        </div>

        <div className={styles.list}>
          {mockNew.map((item) => (
            <div key={item.id} className={styles.item}>
              <div className={styles.itemTop}>
                <img src={bulb} className={styles.icon} />

                <div className={styles.textBlock}>
                  <p className={styles.text}>{item.text}</p>
                  <span className={styles.subtext}>{item.subtext}</span>
                </div>

                <span className={styles.date}>{item.date}</span>
              </div>

              <button className={styles.button}>Перейти</button>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section} style={{ marginTop: "40px" }}>
        <div className={styles.header}>
          <span className={styles.title}>Просмотренные</span>
          <span className={styles.action}>Очистить</span>
        </div>

        <div className={styles.list}>
          {mockSeen.map((item) => (
            <div key={item.id} className={styles.item}>
              <div className={styles.itemTop}>
                <img src={bulb} className={styles.icon} />

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

    </div>
  );
};

export default NotificationsPage;