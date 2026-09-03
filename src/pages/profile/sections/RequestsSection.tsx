import { useAppSelector } from "@/services/hooks";
import { selectExchangeRequests } from "@/services/slices/exchangeRequestsSlice";
import { selectAllSkillCards } from "@/services/slices/skillCardsSlice";
import { SkillCard } from "@/widgets/SkillCard/SkillCard";
import { Button } from "@/shared/ui/Button/Button";
import { acceptRequest, removeRequest } from "@/services/slices/exchangeRequestsSlice";
import { addNotification } from "@/services/slices/notificationsSlice";
import { useAppDispatch } from "@/services/hooks";
import styles from "./RequestsSection.module.scss";

const RequestsSection = () => {
  const requests = useAppSelector(selectExchangeRequests);
  const dispatch = useAppDispatch();
  const allCards = useAppSelector(selectAllSkillCards);

  const requestCards = requests
  .filter((request) => request.status === "pending")
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
            <div className={styles.actions}>
              <Button
                variant="secondary"
                onClick={() => dispatch(removeRequest(item.cardId))}
              >
                Отменить
              </Button>
              <Button onClick={() => {
                dispatch(acceptRequest(item.cardId));
                dispatch(addNotification({
                  title: "Обмен подтверждён",
                  description: `Обмен с ${item.card.user.name} добавлен в ваш список.`,
                  route: "/profile/exchanges",
                }));
              }}>
                Подтвердить в демо
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestsSection;
