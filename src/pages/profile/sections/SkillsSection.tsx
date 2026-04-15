import { useState } from "react";
import { useAppSelector } from "@/services/hooks";
import { selectAllSkillCards } from "@/services/slices/skillCardsSlice";
import { selectUser } from "@/services/slices/authSlice";
import { Tag } from "@/shared/ui/Tag/Tag";
import { Button } from "@/shared/ui/Button/Button";
import { getCategoryColor } from "@/shared/lib/utils/getCategoryColors";

import styles from "./SkillsSection.module.scss";
import { EditTeachSkillModal } from "@/features/ProfileSkillModal/EditTeachSkillModal";
import { EditLearnSkillsModal } from "@/features/ProfileSkillModal/EditLearnSkillsModal";

const SkillsSection = () => {
  const currentUser = useAppSelector(selectUser);
  const allCards = useAppSelector(selectAllSkillCards);

  const [showTeachModal, setShowTeachModal] = useState(false);
  const [showLearnModal, setShowLearnModal] = useState(false);

  // Находим карточку текущего пользователя
  const myCard = allCards.find((c) => c.user.id === currentUser?.id);

  if (!myCard) {
    return (
      <div className={styles.empty}>
        <p>У вас пока нет навыков</p>
        <Button variant="primary" onClick={() => setShowTeachModal(true)}>
          + Добавить навык
        </Button>
      </div>
    );
  }

  const { teachSkill, learnSkills } = myCard;
   const images = teachSkill.images || [];

  return (
    <div className={styles.section}>

      {/* ── Блок "Могу научить" ── */}
      <div className={styles.block}>
        <div className={styles.blockHeader}>
          <h3 className={styles.blockTitle}>Могу научить</h3>

          <Button
            variant="secondary"
            onClick={() => setShowTeachModal(true)}
            className={styles.editButton}
          >
            Редактировать
          </Button>
        </div>

        <div className={styles.teachCard}>
          <div className={styles.teachInfo}>
            <Tag
              label={teachSkill.subcategory.category.name}
              bgColor={getCategoryColor(teachSkill.subcategory.category.slug)}
            />
            <h4 className={styles.teachTitle}>{teachSkill.title}</h4>
            <p className={styles.teachDescription}>{teachSkill.description}</p>
          </div>

          {teachSkill.images && teachSkill.images.length > 0 && (
            <div className={styles.teachImages}>

            {images.length > 0 && (
              <div className={styles.teachImages}>
                {images.slice(0, 3).map((img, index) => (
                  <div key={index} className={styles.imageWrapper}>
                    <img
                      src={img}
                      alt={`${teachSkill.title}-${index}`}
                      className={styles.teachImage}
                    />

                    {index === 2 && images.length > 3 && (
                      <div className={styles.teachImageCount}>
                        +{images.length - 3}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            </div>
          )}
        </div>
      </div>

      {/* ── Блок "Хочу научиться" ── */}
      <div className={styles.block}>
        <div className={styles.blockHeader}>
          <h3 className={styles.blockTitle}>Хочу научиться</h3>
          <Button
            variant="secondary"
            onClick={() => setShowLearnModal(true)}
            className={styles.editButton}
          >
            Редактировать список
          </Button>
        </div>

        {learnSkills.length === 0 ? (
          <p className={styles.emptyLearn}>Навыки не добавлены</p>
        ) : (
          <ul className={styles.learnList}>
            {learnSkills.map((skill) => (
              <li key={skill.id} className={styles.learnItem}>
                <div className={styles.learnItemLeft}>
                  <Tag
                    label={skill.subcategory.category.name}
                    bgColor={getCategoryColor(skill.subcategory.category.slug)}
                  />
                  <span className={styles.learnSkillName}>
                    {skill.subcategory.name}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <EditTeachSkillModal
        isOpen={showTeachModal}
        onClose={() => setShowTeachModal(false)}
        initialData={{
          title: teachSkill.title,
          description: teachSkill.description,
        }}
      />

      <EditLearnSkillsModal
        isOpen={showLearnModal}
        onClose={() => setShowLearnModal(false)}
        initialData={learnSkills.map(s => ({
          name: s.subcategory.name
        }))}
      />
    </div>
  );
};

export default SkillsSection;