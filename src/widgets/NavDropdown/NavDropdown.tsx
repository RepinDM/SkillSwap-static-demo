import { type FC, type ReactNode, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import briefcaseIcon from "@/shared/image/icons/briefcase.svg";
import paletteIcon from "@/shared/image/icons/palette.svg";
import globalIcon from "@/shared/image/icons/global.svg";
import bookIcon from "@/shared/image/icons/book.svg";
import homeIcon from "@/shared/image/icons/home.svg";
import lifestyleIcon from "@/shared/image/icons/lifestyle.svg";

import mockData from "./mockData.json";
import styles from "./NavDropdown.module.scss";

const iconMap: Record<string, string> = {
  briefcase: briefcaseIcon,
  palette: paletteIcon,
  global: globalIcon,
  book: bookIcon,
  home: homeIcon,
  lifestyle: lifestyleIcon,
};

const tagColorMap: Record<string, string> = {
  briefcase: "var(--tag-business-career)",
  palette: "var(--tag-creativity-art)",
  global: "var(--tag-foreign-languages)",
  book: "var(--tag-education-development)",
  home: "var(--tag-home-comfort)",
  lifestyle: "var(--tag-health-lifestyle)",
};

interface NavDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NavDropdown: FC<NavDropdownProps> = ({ isOpen, onClose }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { categories, subcategories } = mockData;

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
        {categories.map((category) => (
          <Category
            key={category.id}
            icon={category.icon}
            title={category.title}
          >
            {subcategories
              .filter((sub) => sub.categoryId === category.id)
              .map((sub) => (
                <Subcategory
                  key={sub.id}
                  title={sub.title}
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
  icon: string;
  title: string;
  children: ReactNode;
}

const Category: FC<CategoryProps> = ({ icon, title, children }) => {
  return (
    <section className={styles.group}>
      <div
        className={styles.iconWrapper}
        style={{ backgroundColor: tagColorMap[icon] }}
      >
        <img className={styles.icon} src={iconMap[icon]} alt="" />
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
