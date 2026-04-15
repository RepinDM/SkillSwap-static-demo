import { useMemo, useState } from "react";

import { useAppSelector } from "@/services/hooks";

import styles from "./FilterSidebar.module.scss";
import crossIcon from "@/shared/image/icons/cross.svg";
import chevronDownIcon from "@/shared/image/icons/chevron-down.svg";
import chevronUpIcon from "@/shared/image/icons/chevron-up.svg";
import type { TFilters } from "@/entities/filters/type";
import type { TGender } from "@/entities/user/types";
import type { TSkillType } from "@/entities/skill/types";
import { selectAllSkillCards, selectCategoryItems } from "@/services/slices/skillCardsSlice";
import { Checkbox } from "@/shared/ui/Checkbox/Checkbox";
import { RadioButton } from "@/shared/ui/RadioButton/RadioButton";

type Props = {
  values: TFilters;
  onChange: (filters: TFilters) => void;
};

const INITIAL_VISIBLE = 5;

export const FiltersSidebar = ({ values, onChange }: Props) => {
  const categoryItems = useAppSelector(selectCategoryItems);

  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllCities, setShowAllCities] = useState(false);

  // const citiesFromServer = useAppSelector(state =>
  // state.skillCards.allSkillCards
  //   .map(c => c.user.city?.name)
  //   .filter((city): city is string => !!city)
  // );

  // const uniqueCities = Array.from(new Set(citiesFromServer));


const allSkillCards = useAppSelector(selectAllSkillCards);

const uniqueCities = useMemo(() => {
  const cities = allSkillCards
    .map(c => c.user.city?.name)
    .filter((city): city is string => !!city);

  return Array.from(new Set(cities));
}, [allSkillCards]);


  const visibleCategories = showAllCategories
    ? categoryItems
    : categoryItems.slice(0, INITIAL_VISIBLE);

  const visibleCities = showAllCities
    ? uniqueCities
    : uniqueCities.slice(0, INITIAL_VISIBLE);

  const toggleCategory = (id: number) => {
    setExpandedCategories(prev =>
      prev.includes(id)
        ? prev.filter(cid => cid !== id)
        : [...prev, id]
    );
  };

  const handleModeChange = (mode: 'all' | TSkillType) => {
    onChange({ ...values, mode });
  };

  const handleGenderChange = (gender: TGender | null) => {
    onChange({ ...values, gender });
  };

  const handleCityToggle = (city: string) => {
    const newCities = values.cities.includes(city)
      ? values.cities.filter(c => c !== city)
      : [...values.cities, city];

    onChange({ ...values, cities: newCities });
  };

  const handleSubcategoryToggle = (id: number) => {
    const newSkillIds = values.skillIds.includes(id)
      ? values.skillIds.filter(sid => sid !== id)
      : [...values.skillIds, id];

    onChange({ ...values, skillIds: newSkillIds });
  };

  const handleCategoryToggle = (subcategoryIds: number[]) => {
    const allSelected = subcategoryIds.every(id =>
      values.skillIds.includes(id)
    );

    let newSkillIds: number[];

    if (allSelected) {
      newSkillIds = values.skillIds.filter(
        id => !subcategoryIds.includes(id)
      );
    } else {
      newSkillIds = [...new Set([...values.skillIds, ...subcategoryIds])];
    }

    onChange({ ...values, skillIds: newSkillIds });
  };

  const handleReset = () => {
    onChange({
      mode: "all",
      gender: null,
      cities: [],
      skillIds: [],
    });

    setExpandedCategories([]);
    setShowAllCategories(false);
    setShowAllCities(false);
  };

  const activeFiltersCount = useMemo(() => {
  let count = 0;

  if (values.mode !== "all") count += 1;
  if (values.gender !== null) count += 1;
  if (values.cities.length > 0) count += values.cities.length;
  if (values.skillIds.length > 0) count += values.skillIds.length;

  return count;
}, [values]);

  return (
    <aside className={styles.sidebar}>
      {/* HEADER */}
      <div className={styles.header}>
        <h3 className={styles.title}>
          Фильтры ({activeFiltersCount})
        </h3>

        <button className={styles.resetButton} onClick={handleReset}>
          Сбросить
          <img src={crossIcon} className={styles.resetIcon} />
        </button>
      </div>

      <div className={styles.filtersWrapper}>
        {/* MODE */}
        <div className={styles.filterGroup}>
          <ul className={styles.radioGroup}>
            <li className={styles.container}>
              <RadioButton
                name="filter-mode"
                value="all"
                label="Всё"
                checked={values.mode === "all"}
                onChange={() => handleModeChange("all")}
              />
            </li>
            <li className={styles.container}>
              <RadioButton
                name="filter-mode"
                value="learn"
                label="Хочу научиться"
                checked={values.mode === "learn"}
                onChange={() => handleModeChange("learn")}
              />
            </li>
            <li className={styles.container}>
              <RadioButton
                name="filter-mode"
                value="teach"
                label="Могу научить"
                checked={values.mode === "teach"}
                onChange={() => handleModeChange("teach")}
              />
            </li>
          </ul>
        </div>

        {/* SKILLS */}
        <div className={styles.filterGroup}>
          <h4 className={styles.sectionTitle}>Навыки</h4>

          <ul className={styles.categoriesList}>
            {visibleCategories.map((category) => {
              const subs = category.subcategories;
              const allChecked = subs.every((sub) =>
                values.skillIds.includes(sub.id)
              );
              const someChecked = subs.some((sub) =>
                values.skillIds.includes(sub.id)
              );

              return (
                <li key={category.id} className={styles.categoryItem}>
                  <div className={styles.categoryHeader}>
                    <div className={styles.container}>
                      <Checkbox
                        label={category.name}
                        checked={allChecked}
                        indeterminate={someChecked && !allChecked}
                        onChange={() =>
                          handleCategoryToggle(subs.map((sub) => sub.id))
                        }
                      />
                    </div>

                    <button
                      className={styles.accordionButton}
                      onClick={() => toggleCategory(category.id)}
                      type="button"
                    >
                      <img
                        src={
                          expandedCategories.includes(category.id)
                            ? chevronUpIcon
                            : chevronDownIcon
                        }
                        alt=""
                      />
                    </button>
                  </div>

                  {expandedCategories.includes(category.id) && (
                    <ul className={styles.subcategoriesList}>
                      {subs.map((sub) => (
                        <li key={sub.id} className={styles.container}>
                          <Checkbox
                            label={sub.name}
                            checked={values.skillIds.includes(sub.id)}
                            onChange={() =>
                              handleSubcategoryToggle(sub.id)
                            }
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>

          <button
            className={styles.showAllButton}
            onClick={() => setShowAllCategories(!showAllCategories)}
          >
            {showAllCategories ? "Скрыть категории" : "Все категории"}
            <img
              src={showAllCategories ? chevronUpIcon : chevronDownIcon}
            />
          </button>
        </div>

        {/* GENDER */}
        <div className={styles.filterGroup}>
          <h4 className={styles.sectionTitle}>Пол автора</h4>

          <ul className={styles.radioGroup}>
            <li className={styles.container}>
              <RadioButton
                name="filter-gender"
                value="any"
                label="Не имеет значения"
                checked={values.gender === null}
                onChange={() => handleGenderChange(null)}
              />
            </li>

            <li className={styles.container}>
              <RadioButton
                name="filter-gender"
                value="male"
                label="Мужской"
                checked={values.gender === "male"}
                onChange={() => handleGenderChange("male")}
              />
            </li>

            <li className={styles.container}>
              <RadioButton
                name="filter-gender"
                value="female"
                label="Женский"
                checked={values.gender === "female"}
                onChange={() => handleGenderChange("female")}
              />
            </li>
          </ul>
        </div>

        {/* CITIES */}
        <div className={styles.filterGroup}>
          <h4 className={styles.sectionTitle}>Город</h4>

          <ul className={styles.citiesList}>
            {visibleCities.map(city => (
              <li key={city} className={styles.container}>
                <Checkbox
                  label={city}
                  checked={values.cities.includes(city)}
                  onChange={() => handleCityToggle(city)}
                />
              </li>
            ))}
          </ul>

          <button
            className={styles.showAllButton}
            onClick={() => setShowAllCities(!showAllCities)}
          >
            {showAllCities ? "Скрыть города" : "Все города"}
            <img
              src={showAllCities ? chevronUpIcon : chevronDownIcon}
            />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default FiltersSidebar;