import { Modal } from "@/shared/ui/modal/Modal";
import { Button } from "@/shared/ui/Button/Button";
import { Avatar } from "@/shared/ui/Avatar/Avatar";
import styles from "./ExchangeSuggestedModal.module.scss";
import { useAppDispatch } from "@/services/hooks";
import type { TSkillCard } from "@/entities/skill/types";
import type { FC } from "react";
import { addRequest } from "@/services/slices/exchangeRequestsSlice";

interface ExchangeSuggestedModalProps {
  isOpen: boolean;
  onClose: () => void;
  card: TSkillCard;
}

export const ExchangeSuggestedModal: FC<ExchangeSuggestedModalProps> = ({
  isOpen,
  onClose,
  card
}) => {

  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    dispatch(
      addRequest({
        cardId: card.id,
        status: "pending",
        createdAt: new Date().toISOString(),
      })
    );

    onClose();
  };

  if (!card) return null;


  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        <Avatar size={75} />
        <h2 className={styles.title}>Вы предложили обмен</h2>
        <p className={styles.description}>Теперь дождитесь подтверждения. Вам придёт уведомление</p>
        <div className={styles.buttonWrapper}>
          <Button className={styles.exchangeButton} onClick={handleSubmit}>
            Готово
          </Button>
        </div>
      </div>
    </Modal>
  );
};
