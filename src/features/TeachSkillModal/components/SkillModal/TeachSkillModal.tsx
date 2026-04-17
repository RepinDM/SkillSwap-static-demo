import type { FC } from "react";
import { Button } from "@/shared/ui/Button/Button";
import type { TSkill } from "@/entities/skill/types";
import styles from "./TeachSkillModal.module.scss";
import icon from "@/shared/image/icons/edit.svg";

interface teachSkillModalProps {
  isOpen: boolean;
  teachSkill: TSkill;
  onEdit: () => void;
  onDone: () => void;
}

export const TeachSkillModal: FC<teachSkillModalProps> = ({
  isOpen,
  teachSkill,
  onEdit,
  onDone,
}) => {

  if (!isOpen) return null;

  const mainImage = teachSkill.images?.[0];

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.header}>Ваше предложение</h2>
        <p className={styles.subHeader}>
          Пожалуйста, проверьте и подтвердите правильность данных
        </p>

        <div className={styles.content}>
          <div className={styles.info}>
             <div className={styles.textBlock}>
                <div className={styles.textBlockTitle}>
                    <h3 className={styles.title}>{teachSkill.title}</h3>
                    <p className={styles.category}>
                        {teachSkill.subcategory.category.name} /{" "}
                        {teachSkill.subcategory.name}
                    </p>
                </div>
                <p className={styles.description}>
                    {teachSkill.description}
                </p>
             </div>
             <div className={styles.actions}>
              <Button
                variant="secondary"
                onClick={onEdit}
                iconRight={<img src={icon} alt="Иконка редактирования" />}
              >
                Редактировать
              </Button>

              <Button onClick={onDone}>
                Готово
              </Button>
            </div>
          </div>

          <div className={styles.gallery}>
            <img
            src={mainImage || "https://via.placeholder.com/324"}
            className={styles.mainImage}
            alt="main"
            />
            <div className={styles.previewColumn}>
                {teachSkill.images?.slice(1, 4).map((img, i) => (
                    <img
                    key={i}
                    src={img}
                    className={styles.preview}
                    alt="preview"
                    />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};