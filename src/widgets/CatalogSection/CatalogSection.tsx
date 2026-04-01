import type React from 'react';
import type { TSkillCard } from '../../entities/skill/types';
import styles from './CatalogSection.module.scss';
import { SkillCard } from '../SkillCard/SkillCard';

interface CatalogSectionProps {
    title: string; //заголовок
    skillCards: TSkillCard[]; //массив карточек
    onViewAll?: () => void; //cb для кнопки Смотреть всё
}

const CatalogSection: React.FC<CatalogSectionProps> = ({
  title,
  skillCards,
  onViewAll,
}) => {
  return (
    <section className={`${styles.section}`}>
      {/* Заголовок и ссылка "Смотреть все" */}
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {onViewAll && (
          <button
            className={styles.viewAllButton}
            onClick={onViewAll}
            aria-label={`Смотреть все ${title.toLowerCase()}`}
          >
            Смотреть все
          </button>
        )}
      </div>

      {/* Грид карточек */}
      <div className={styles.grid}>
        {skillCards.map((card) => (
          <SkillCard card={card} />
        ))}
      </div>
    </section>
  );
};

export default CatalogSection;