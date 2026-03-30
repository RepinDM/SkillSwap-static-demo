import { CATEGORY_COLORS, type CategoryColorKey } from "@/shared/lib/Colors/categoryColors";
import styles from "./Tag.module.scss";

type Props = {
  label: string;
  categorySlug: CategoryColorKey;
};

/**
 * Пример для проверки с моковыми данными, в любом компоненте:
 * const mockSkill = {
    title: "реакт",
    subCategory: {
      category: {
        slug:"homeComfort"
      }
    }
  };
  <Tag
     label={mockSkill.title}
     categorySlug={mockSkill.subCategory.category.slug as CategoryColorKey}
  />
 */
export const Tag = ({ label, categorySlug }: Props) => {
  const colorKey = CATEGORY_COLORS[categorySlug];

  const backgroundColor = colorKey
    ? CATEGORY_COLORS[categorySlug]
    : CATEGORY_COLORS.plus;

  return (
    <span className={styles.tag} style={{ backgroundColor }}>
      {label}
    </span>
  );
};