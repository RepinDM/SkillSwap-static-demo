import type React from 'react';
import type { TSkillCard } from '../../entities/skill/types';
import styles from './CatalogSection.module.scss';
import { SkillCard } from '../SkillCard/SkillCard';
import chevrone_right from '@/shared/image/icons/chevron-right.svg';
import chevrone_down from '@/shared/image/icons/chevron-down.svg';

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
            <img src={skillCards.length===3 ? chevrone_right : chevrone_down} alt="" className={styles.icon} />
          </button>
        )}
      </div>

      {/* Грид карточек */}
      <ul className={styles.grid}>
        {skillCards.map((card) => (
          <SkillCard 
            key={card.id}
            card={card} 
          />
        ))}
      </ul>
    </section>
  );
};

export default CatalogSection;