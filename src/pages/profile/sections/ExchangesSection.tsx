import { useAppSelector } from "@/services/hooks";
import { selectExchangeRequests } from "@/services/slices/exchangeRequestsSlice";
import { selectAllSkillCards } from "@/services/slices/skillCardsSlice";
import { SkillCard } from "@/widgets/SkillCard/SkillCard";
import styles from "./RequestsSection.module.scss";

const ExchangesSection = () => {
  const requests = useAppSelector(selectExchangeRequests);
  const cards = useAppSelector(selectAllSkillCards);
  const acceptedCards = requests
    .filter((request) => request.status === "accepted")
    .map((request) => cards.find((card) => card.id === request.cardId))
    .filter((card): card is NonNullable<typeof card> => card !== undefined);

  if (!acceptedCards.length) {
    return <div className={styles.empty}>Подтверждённых обменов пока нет</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Мои обмены</h2>
      <p className={styles.status}>Подтверждённые предложения в этой демо-версии</p>
      <div className={styles.list}>
        {acceptedCards.map((card) => <SkillCard key={card.id} card={card} />)}
      </div>
    </div>
  );
};

export default ExchangesSection;
