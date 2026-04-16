import styles from "./AboutPage.module.scss";

const teamMembers = [
  { name: "Репин Дмитрий", email: "dmrepin26@yandex.ru" },
  { name: "Дубровина Анастасия", email: "anadubro@yandex.ru" },
  { name: "Малышев Даниил", email: "dan13213211@yandex.ru" },
  { name: "Демкина Ирина", email: "irina.demckina2017@yandex.ru" },
  { name: "Белозерцева Полина", email: "belozertsevapolina@yandex.ru" },
  { name: "Емельянов Игорь", email: "igor3melya@yandex.ru" },
  { name: "Спичихин Ярослав", email: "yaspichihin@yandex.ru" },
  { name: "Кошанов Альберт", email: "adletkoshanov@gmail.com" },
  { name: "Низовская Елена", email: "lennie22@yandex.ru" },
];

const AboutPage = () => {
  return (
    <section className={styles.page}>
      <div className={styles.hero}>
        <p className={styles.kicker}>О проекте</p>
        <h1 className={styles.title}>SkillSwap</h1>
        <p className={styles.description}>
          SkillSwap - веб-приложение для обмена навыками между разработчиками.
          Пользователи могут делиться опытом, искать нужные навыки, добавлять
          карточки в избранное и создавать заявки на обучение.
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.teamHeader}>
          <h2 className={styles.subtitle}>Над проектом работали:</h2>
        </div>

        <div className={styles.grid}>
          {teamMembers.map((member, index) => (
            <article key={member.email} className={styles.card}>
              <span className={styles.number}>{index + 1}</span>
              <h3 className={styles.name}>{member.name}</h3>
              <a href={`mailto:${member.email}`} className={styles.email}>
                {member.email}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
