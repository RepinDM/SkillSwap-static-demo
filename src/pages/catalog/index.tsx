import type { TFilters } from "@/entities/filters/type";
import type { TSkillCard } from "@/entities/skill/types";
import FiltersSidebar from "@/features/filter-sidebar/FilterSidebar";
import { useAppSelector } from "@/services/hooks";
import {
  selectAllSkillCards,
  selectCategoryItems,
  selectSearchQuery,
  selectStatus,
} from "@/services/slices/skillCardsSlice";
import { useInfiniteScroll } from "@/shared/hooks/useInfiniteScroll";
import CatalogSection from "@/widgets/CatalogSection/CatalogSection";
import { useCallback, useMemo, useState } from "react";
import styles from "./GlobalSearch.module.scss";
import { Button } from "@/shared/ui/Button/Button";
import crossIcon from "@/shared/image/icons/cross.svg";
import { Loader } from "@/shared/ui/Loader";

const CatalogPage = () => {
  const allSkillCards = useAppSelector(selectAllSkillCards);
  const status = useAppSelector(selectStatus);
  const searchQuery = useAppSelector(selectSearchQuery);
  const categoryItems = useAppSelector(selectCategoryItems);

  const isLoading = status === "loading";

  const [filters, setFilters] = useState<TFilters>({
    mode: "all",
    gender: null,
    cities: [],
    skillIds: [],
  });

  const [visibleCount, setVisibleCount] = useState(20);
  const [isExtended, setIsExtended] = useState({
    popular: false,
    new: false,
    recomended: false
  })

  const handleFiltersChange = useCallback((newFilters: TFilters) => {
    setFilters(newFilters);
    setVisibleCount(20);
  }, []);

  // Применяет поиск поверх любого массива карточек
  const applySearch = useCallback(
    (cards: TSkillCard[]) => {
      if (!searchQuery.trim()) return cards;
      const q = searchQuery.toLowerCase();
      return cards.filter(
        (card) =>
          card.teachSkill.title.toLowerCase().includes(q) ||
          card.user.name.toLowerCase().includes(q) ||
          card.teachSkill.subcategory.name.toLowerCase().includes(q) ||
          card.teachSkill.subcategory.category.name.toLowerCase().includes(q) ||
          card.learnSkills.some(
            (skill) =>
              skill.title.toLowerCase().includes(q) ||
              skill.subcategory.name.toLowerCase().includes(q),
          ),
      );
    },
    [searchQuery],
  );

  // Карточки прошедшие через фильтры пола/города/режима/подкатегорий
  const likes = useAppSelector((state) => state.likes.likes);


  const filteredCards = useMemo(() => {
    return allSkillCards.filter((card) => {
      const cityName = card.user.city?.name;

      if (filters.gender) {
        if (!card.user.gender) return false;
        if (filters.gender !== card.user.gender) return false;
      }

      if (
        filters.cities.length > 0 &&
        (!cityName || !filters.cities.includes(cityName))
      )
        return false;

      if (filters.skillIds.length > 0) {
        if (filters.mode === "learn") {
          if (
            !card.learnSkills.some((skill) =>
              filters.skillIds.includes(skill.subcategory.id),
            )
          )
            return false;
        }

        if (filters.mode === "teach") {
          if (!filters.skillIds.includes(card.teachSkill.subcategory.id))
            return false;
        }
      }

      return true;
    });
  }, [allSkillCards, filters]);

  // Итоговый список для отображения - фильтры + поиск
  const sourceCards = useMemo(() => {
    let cards: TSkillCard[];

    if (filters.mode === "all") {
      cards = allSkillCards.filter((card) => {
        const cityName = card.user.city?.name;
        if (filters.gender && card.user.gender !== filters.gender) return false;
        if (
          filters.cities.length > 0 &&
          (!cityName || !filters.cities.includes(cityName))
        )
          return false;
        return true;
      });
    } else {
      cards = filteredCards;
    }

    return applySearch(cards);
  }, [allSkillCards, filters, filteredCards, applySearch]);

  const displayedCards = useMemo(() => {
    return sourceCards.slice(0, visibleCount);
  }, [sourceCards, visibleCount]);

  // Собираем активные плашки из текущих фильтров
  const activeFilterTags = useMemo(() => {
    const tags: { id: string; label: string; onRemove: () => void }[] = [];

    // Режим (если не "all")
    if (filters.mode === "learn") {
      tags.push({
        id: "mode-learn",
        label: "Хочу научиться",
        onRemove: () => handleFiltersChange({ ...filters, mode: "all" }),
      });
    }
    if (filters.mode === "teach") {
      tags.push({
        id: "mode-teach",
        label: "Могу научить",
        onRemove: () => handleFiltersChange({ ...filters, mode: "all" }),
      });
    }

    // Выбранные подкатегории
    filters.skillIds.forEach((skillId) => {
      const subcategory = categoryItems
        .flatMap((c) => c.subcategories)
        .find((s) => s.id === skillId);

      if (subcategory) {
        tags.push({
          id: `skill-${skillId}`,
          label: subcategory.name,
          onRemove: () =>
            handleFiltersChange({
              ...filters,
              skillIds: filters.skillIds.filter((id) => id !== skillId),
            }),
        });
      }
    });

    // Города
    filters.cities.forEach((city) => {
      tags.push({
        id: `city-${city}`,
        label: city,
        onRemove: () =>
          handleFiltersChange({
            ...filters,
            cities: filters.cities.filter((c) => c !== city),
          }),
      });
    });

    // Пол
    if (filters.gender === "male") {
      tags.push({
        id: "gender-male",
        label: "Мужской",
        onRemove: () => handleFiltersChange({ ...filters, gender: null }),
      });
    }
    if (filters.gender === "female") {
      tags.push({
        id: "gender-female",
        label: "Женский",
        onRemove: () => handleFiltersChange({ ...filters, gender: null }),
      });
    }

    return tags;
  }, [filters, categoryItems, handleFiltersChange]);

  // Популярное и Новое тоже учитывают поиск
  const popularCards = useMemo(() => {
    if (filters.mode !== "all") return [];
    const base = allSkillCards.filter((card) => {
      const cityName = card.user.city?.name;
      if (filters.gender && card.user.gender !== filters.gender) return false;
      if (
        filters.cities.length > 0 &&
        (!cityName || !filters.cities.includes(cityName))
      )
        return false;
      return true;
    });
    return applySearch(base);
  }, [allSkillCards, filters, applySearch]);

  const newCards = useMemo(() => {
    if (filters.mode !== "all") return [];
    const base = [...allSkillCards]
      .filter((card) => {
        const cityName = card.user.city?.name;
        if (filters.gender && card.user.gender !== filters.gender) return false;
        if (
          filters.cities.length > 0 &&
          (!cityName || !filters.cities.includes(cityName))
        )
          return false;
        return card.teachSkill?.createdDate;
      })
      .sort((a, b) => {
        const dateA = new Date(a.teachSkill.createdDate);
        const dateB = new Date(b.teachSkill.createdDate);
        return dateB.getTime() - dateA.getTime();
      })
      .slice(0, 3);
    return applySearch(base);
  }, [allSkillCards, filters, applySearch]);

  const hasMore = visibleCount < sourceCards.length;

  const loadMore = () => {
    if (!hasMore || isLoading) return;
    setVisibleCount((prev) => prev + 20);
  };

  const { lastElementRef } = useInfiniteScroll({
    hasMore,
    isLoading,
    onLoadMore: loadMore,
  });

  const isSearching = searchQuery.trim().length > 0;
  const isFiltering = filters.mode !== "all" || filters.skillIds.length > 0;

  if (isLoading) return <Loader label="Загрузка каталога" />;

  const popular = [...popularCards].sort(
    (a, b) => (likes[b.id]?.count ?? 0) - (likes[a.id]?.count ?? 0),
  );

  return (
    <div style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
      <FiltersSidebar values={filters} onChange={handleFiltersChange} />
      <div style={{ flex: 1 }}>
        {/* Активные фильтры */}
        {activeFilterTags.length > 0 && (
          <div className={styles.activeFilterTags}>
            {activeFilterTags.map((tag) => (
              <Button
                className={styles.activeFilterTag}
                key={tag.id}
                onClick={tag.onRemove}
                variant="tertiary"
                iconRight={<img src={crossIcon} alt="close" />}
              >
                {tag.label}
              </Button>
            ))}
          </div>
        )}

        {/* Счётчик результатов */}
        {(isSearching || isFiltering) && (
          <p className={styles.searchResultsCount}>
            Подходящие предложения: {sourceCards.length}
          </p>
        )}

        {/* Секции каталога */}
        {isSearching || isFiltering ? (
          <CatalogSection
            title={isSearching ? `Результаты поиска: «${searchQuery}»` : ""}
            skillCards={displayedCards}
          />
        ) : (
          <>
            <CatalogSection title="Популярное" skillCards={isExtended.popular? popular : popular.slice(0, 3)} onViewAll={() => setIsExtended((ex) => ({...ex, popular:!ex.popular}))} />
            <CatalogSection title="Новое" skillCards={newCards} />
            <CatalogSection title="Рекомендуем" skillCards={displayedCards} />
          </>
        )}

        {hasMore && !isLoading && (
          <div ref={lastElementRef} style={{ height: "20px" }} />
        )}
      </div>
    </div>
  );
};

export default CatalogPage;
