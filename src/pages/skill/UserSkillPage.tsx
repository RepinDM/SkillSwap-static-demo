import { getAgeLabel } from "@/shared/lib/utils/getAge";
import { Avatar } from "@/shared/ui/Avatar/Avatar";
import { Tag } from "@/shared/ui/Tag/Tag";
import { getCategoryColor } from "@/shared/lib/utils/getCategoryColors";
import styles from "./UserSkillPage.module.scss";

interface UserSkillPageProps {
  avatar?: string;
  name: string;
  city: string;
  age?: number;
  about?: string;
  teachSkill: {
    title: string;
    subcategory: {
      category: { 
        name?: string;
        slug: string;
      };
    };
  };
  learnSkills: Array<{
    id: number;
    subcategory: {
      name: string;
      category: { 
        name?: string;
        slug: string;
      };
    };
  }>;
}

// Функция для сокращения имени (только имя, без фамилии)
const getFirstName = (fullName: string) => {
  if (!fullName) return "";
  return fullName.split(' ')[0] || fullName;
};

export const UserSkillPage = ({
  avatar,
  name,
  city,
  age,
  about,
  teachSkill,
  learnSkills,
}: UserSkillPageProps) => {
  return (
    <div className={styles.authorColumn}>
      {/* Верхняя строка: аватар + информация */}
      <div className={styles.authorHeader}>
        <Avatar src={avatar} size={64} />
        <div className={styles.authorInfo}>
          <h3 className={styles.authorName}>{getFirstName(name)}</h3>
          <p className={styles.authorMeta}>
            {city}{age ? `, ${age} ${getAgeLabel(age)}` : ""}
          </p>
        </div>
      </div>
      {about && <p className={styles.authorAbout}>{about}</p>}

      {/* Блоки навыков */}
      <div className={styles.skillBlock}>
        <h4 className={styles.blockTitle}>Может научить</h4>
        <Tag
          label={teachSkill.title}
          bgColor={getCategoryColor(teachSkill.subcategory.category.slug)}
        />
      </div>

      <div className={styles.skillBlock}>
        <h4 className={styles.blockTitle}>Хочет научиться</h4>
        <ul className={styles.learnList}>
          {learnSkills.map((skill) => (
            <li key={skill.id}>
              <Tag
                label={skill.subcategory.name}
                bgColor={getCategoryColor(skill.subcategory.category.slug)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};