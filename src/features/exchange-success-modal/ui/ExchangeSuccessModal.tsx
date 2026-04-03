import type { FC } from "react";
import { Modal } from "@/shared/ui/Modal/Modal";
import { Button } from "@/shared/ui/Button/Button";
import { Avatar } from "@/shared/ui/Avatar/Avatar";
import styles from "./ExchangeSuccessModal.module.scss";

interface ExchangeSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExchangeSuccessModal: FC<ExchangeSuccessModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        <Avatar size={75} />
        <h2 className={styles.title}>Ваше предложение создано</h2>
        <p className={styles.description}>Теперь вы можете предложить обмен</p>
        <div className={styles.buttonWrapper}>
          <Button onClick={onClose} variant="primary">
            Готово
          </Button>
        </div>
      </div>
    </Modal>
  );
};
