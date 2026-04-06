import { type FC, type ReactNode, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import briefcaseIcon from "@/shared/image/icons/briefcase.svg";
import paletteIcon from "@/shared/image/icons/palette.svg";
import globalIcon from "@/shared/image/icons/global.svg";
import bookIcon from "@/shared/image/icons/book.svg";
import homeIcon from "@/shared/image/icons/home.svg";
import lifestyleIcon from "@/shared/image/icons/lifestyle.svg";

import { useAppSelector } from "@/services/hooks";
import { getCategoryColor } from "@/shared/lib/utils/getCategoryColors";

import styles from "./NavDropdown.module.scss";

const iconMap: Record<string, string> = {
  businesscareer: briefcaseIcon,
  creativityart: paletteIcon,
  foreignlanguages: globalIcon,
  educationdevelopment: bookIcon,
  homecomfort: homeIcon,
  healthlifestyle: lifestyleIcon,
};

interface NavDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NavDropdown: FC<NavDropdownProps> = ({ isOpen, onClose }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const categoryItems = useAppSelector((state) => state.skillCards.categoryItems);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <nav className={styles.menu}>
        {categoryItems.map((category) => (
          <Category
            key={category.id}
            slug={category.slug}
            title={category.name}
          >
            {category.subcategories.map((sub) => (
                <Subcategory
                  key={sub.id}
                  title={sub.name}
                  href={`/catalog?subcategory=${sub.id}`}
                />
              ))}
          </Category>
        ))}
      </nav>
    </div>
  );
};

interface CategoryProps {
  slug: string;
  title: string;
  children: ReactNode;
}

const Category: FC<CategoryProps> = ({ slug, title, children }) => {
  return (
    <section className={styles.group}>
      <div
        className={styles.iconWrapper}
        style={{ backgroundColor: getCategoryColor(slug) }}
      >
        <img className={styles.icon} src={iconMap[slug]} alt="" />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <ul className={styles.list}>{children}</ul>
      </div>
    </section>
  );
};

interface SubcategoryProps {
  title: string;
  href: string;
}

const Subcategory: FC<SubcategoryProps> = ({ title, href }) => {
  return (
    <li className={styles.item}>
      <Link className={styles.link} to={href}>
        {title}
      </Link>
    </li>
  );
};
