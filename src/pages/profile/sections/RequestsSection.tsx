import { useAppSelector } from "@/services/hooks";
import { selectExchangeRequests } from "@/services/slices/exchangeRequestsSlice";
import { selectAllSkillCards } from "@/services/slices/skillCardsSlice";
import { SkillCard } from "@/widgets/SkillCard/SkillCard";
import styles from "./RequestsSection.module.scss";

const RequestsSection = () => {
  const requests = useAppSelector(selectExchangeRequests);
  const allCards = useAppSelector(selectAllSkillCards);

  const requestCards = requests
  .map((req) => {
    const card = allCards.find((c) => c.id === req.cardId);
    return card ? { ...req, card } : null;
  })
  .filter((item): item is NonNullable<typeof item> => item !== null);

  if (!requestCards.length) {
    return <div className={styles.empty}>У вас пока нет заявок</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Мои заявки</h2>

      <div className={styles.list}>
        {requestCards.map((item) => (
          <div key={item.card.id} className={styles.cardWrapper}>
            <span className={styles.status}>В ожидании...</span>
            <SkillCard card={item.card} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestsSection;