import type { TFilters } from "@/entities/filters/type";
import type { TSkillCard } from "@/entities/skill/types";
import FiltersSidebar from "@/features/filter-sidebar/FilterSidebar";
import { useAppSelector } from "@/services/hooks";
import {
  selectAllSkillCards,
  selectSearchQuery,
  selectStatus,
} from "@/services/slices/skillCardsSlice";
import { useInfiniteScroll } from "@/shared/hooks/useInfiniteScroll";
import CatalogSection from "@/widgets/CatalogSection/CatalogSection";
import { useCallback, useMemo, useState } from "react";

const CatalogPage = () => {
  const allSkillCards = useAppSelector(selectAllSkillCards);
  const status = useAppSelector(selectStatus);
  const searchQuery = useAppSelector(selectSearchQuery);

  const isLoading = status === "loading";

  const [filters, setFilters] = useState<TFilters>({
    mode: "all",
    gender: null,
    cities: [],
    skillIds: [],
  });

  const [visibleCount, setVisibleCount] = useState(20);

  const handleFiltersChange = useCallback((newFilters: TFilters) => {
    setFilters(newFilters);
    setVisibleCount(20);
  }, []);

  // Применяет поиск поверх любого массива карточек
  const applySearch = useCallback(
    (cards: TSkillCard[]) => {
      if (!searchQuery.trim()) return cards;
      const q = searchQuery.toLowerCase();
      return cards.filter((card) =>
        card.teachSkill.title.toLowerCase().includes(q) ||
        card.user.name.toLowerCase().includes(q) ||
        card.teachSkill.subcategory.name.toLowerCase().includes(q) ||
        card.teachSkill.subcategory.category.name.toLowerCase().includes(q) ||

        card.learnSkills.some(skill =>
          skill.title.toLowerCase().includes(q) ||
          skill.subcategory.name.toLowerCase().includes(q)
        )
      );
    },
    [searchQuery]
  );

  // Карточки прошедшие через фильтры пола/города/режима/подкатегорий
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
              filters.skillIds.includes(skill.subcategory.id)
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

  if (isLoading) return <p>Loading...</p>;

  return (
    <div style={{ display: "flex", gap: "24px" }}>
      <FiltersSidebar values={filters} onChange={handleFiltersChange} />
      <div style={{ flex: 1 }}>
        {isSearching || isFiltering ? (
          <CatalogSection
            title={
              isSearching
                ? `Результаты поиска: «${searchQuery}»`
                : "Результаты поиска"
            }
            skillCards={displayedCards}
          />
        ) : (
          <>
            <CatalogSection title="Популярное" skillCards={popularCards} />
            <CatalogSection title="Новое" skillCards={newCards} />
            <CatalogSection
              title="Рекомендуем"
              skillCards={displayedCards}
            />
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