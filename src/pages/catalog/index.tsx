import type { TFilters } from "@/entities/filters/type";
import FiltersSidebar from "@/features/filter-sidebar/FilterSidebar";
import { useAppSelector } from "@/services/hooks";
import CatalogSection from "@/widgets/CatalogSection/CatalogSection";
import { useMemo, useState, useEffect} from "react";
import { useInfiniteScroll } from "@/shared/hooks/useInfiniteScroll";

const CatalogPage = () => {
  const { allSkillCards, isLoading } = useAppSelector(state => state.skillCards);

  const [filters, setFilters] = useState<TFilters>({
    mode: "all",
    gender: null,
    cities: [],
    skillIds: [],
  });


  const [visibleCount, setVisibleCount] = useState(20);

  const allRecommendedCards = useMemo(() => {
    return [...allSkillCards];
  }, [allSkillCards]);

  const displayedRecommendedCards = useMemo(() => {
    return allRecommendedCards.slice(0, visibleCount);
  }, [allRecommendedCards, visibleCount]);

  const hasMore = visibleCount < allRecommendedCards.length;

  const loadMore = () => {
    if (!hasMore) return;
    setVisibleCount(prev => prev + 20);
  };

  const { lastElementRef } = useInfiniteScroll({
    hasMore,
    isLoading: false,
    onLoadMore: loadMore,
  });


  useEffect(() => {
    setVisibleCount(20);
  }, [allSkillCards]);

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
        };

        if (filters.mode === "teach") {
          if (!filters.skillIds.includes(card.teachSkill.subcategory.id)) return false;
        };
      };

      return true;
    });
  }, [allSkillCards, filters]);

  if (isLoading) return <p>Loading...</p>;

  const popularCards = allSkillCards;

  const newCards = [...allSkillCards]
    .filter(card => card.teachSkill?.createdDate)
    .sort((a, b) => {
      const dateA = new Date(a.teachSkill.createdDate);
      const dateB = new Date(b.teachSkill.createdDate);
      return dateB.getTime() - dateA.getTime();
    }).slice(0, 3);

  return (
    <div style={{ display: "flex", gap: "24px" }}>
      <FiltersSidebar values={filters} onChange={setFilters} />
      <div style={{ flex: 1 }}>
        {filters.mode === "all" &&
          <>
            <CatalogSection title="Популярное" skillCards={popularCards}/>
            <CatalogSection title="Новое" skillCards={newCards}/>
            <CatalogSection
              title="Рекомендуем"
              skillCards={displayedRecommendedCards}
            />
            {/* Элемент для отслеживания конца списка */}
            {hasMore && (
              <div ref={lastElementRef} style={{ height: "20px" }} />
            )}
          </>
        }

        {filters.mode !== "all" && (
          <CatalogSection title="Результаты поиска" skillCards={filteredCards} />
        )}
      </div>
    </div>
  );
}

export default CatalogPage;