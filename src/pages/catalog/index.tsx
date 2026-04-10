import type { TFilters } from "@/entities/filters/type";
import FiltersSidebar from "@/features/filter-sidebar/FilterSidebar";
import { useAppSelector } from "@/services/hooks";
import { selectAllSkillCards, selectStatus } from "@/services/slices/skillCardsSlice";
import CatalogSection from "@/widgets/CatalogSection/CatalogSection";
import { useMemo, useState, useCallback } from "react";
import { useInfiniteScroll } from "@/shared/hooks/useInfiniteScroll";

const CatalogPage = () => {
  const allSkillCards = useAppSelector(selectAllSkillCards);
  const status = useAppSelector(selectStatus);

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

  const filteredCards = useMemo(() => {
    return allSkillCards.filter(card => {
      const cityName = card.user.city?.name;

      if (filters.gender) {
        if (!card.user.gender) return false;
        if (filters.gender !== card.user.gender) return false;
      }

      if (filters.cities.length > 0 && (!cityName || !filters.cities.includes(cityName))) return false;

      if (filters.skillIds.length > 0) {
        if (filters.mode === "learn") {
          if (!card.learnSkills.some(skill => filters.skillIds.includes(skill.subcategory.id))) return false;
        }

        if (filters.mode === "teach") {
          if (!filters.skillIds.includes(card.teachSkill.subcategory.id)) return false;
        }
      }

      return true;
    });
  }, [allSkillCards, filters]);

  const sourceCards = useMemo(() => {
    if (filters.mode === "all") {
      const filteredByGenderAndCity = allSkillCards.filter(card => {
        const cityName = card.user.city?.name;

        if (filters.gender) {
          if (!card.user.gender) return false;
          if (filters.gender !== card.user.gender) return false;
        }

        if (filters.cities.length > 0 && (!cityName || !filters.cities.includes(cityName))) return false;

        return true;
      });
      return filteredByGenderAndCity;
    }

    return filteredCards;
  }, [allSkillCards, filters, filteredCards]);

  const displayedCards = useMemo(() => {
    return sourceCards.slice(0, visibleCount);
  }, [sourceCards, visibleCount]);

  const popularCards = useMemo(() => {
    if (filters.mode !== "all") return [];
    return allSkillCards.filter(card => {
      const cityName = card.user.city?.name;
      if (filters.gender && card.user.gender !== filters.gender) return false;
      if (filters.cities.length > 0 && (!cityName || !filters.cities.includes(cityName))) return false;
      return true;
    });
  }, [allSkillCards, filters]);

  const newCards = useMemo(() => {
    if (filters.mode !== "all") return [];
    return [...allSkillCards]
      .filter(card => {
        const cityName = card.user.city?.name;
        if (filters.gender && card.user.gender !== filters.gender) return false;
        if (filters.cities.length > 0 && (!cityName || !filters.cities.includes(cityName))) return false;
        return card.teachSkill?.createdDate;
      })
      .sort((a, b) => {
        const dateA = new Date(a.teachSkill.createdDate);
        const dateB = new Date(b.teachSkill.createdDate);
        return dateB.getTime() - dateA.getTime();
      })
      .slice(0, 3);
  }, [allSkillCards, filters]);

  const hasMore = visibleCount < sourceCards.length;

  const loadMore = () => {
    if (!hasMore || isLoading) return;
    setVisibleCount(prev => prev + 20);
  };

  const { lastElementRef } = useInfiniteScroll({
    hasMore,
    isLoading,
    onLoadMore: loadMore,
  });

  if (isLoading) return <p>Loading...</p>;


  return (
    <div style={{ display: "flex", gap: "24px" }}>
      <FiltersSidebar values={filters} onChange={handleFiltersChange} />
      <div style={{ flex: 1 }}>
        {filters.mode === "all" && (
          <>
            <CatalogSection title="Популярное" skillCards={popularCards} />
            <CatalogSection title="Новое" skillCards={newCards} />
            <CatalogSection
              title="Рекомендуем"
              skillCards={displayedCards}
            />
            {hasMore && !isLoading && (
              <div ref={lastElementRef} style={{ height: "20px" }} />
            )}
          </>
        )}

        {filters.mode !== "all" && (
          <CatalogSection title="Результаты поиска" skillCards={filteredCards} />
        )}
      </div>
    </div>
  );
}

export default CatalogPage;