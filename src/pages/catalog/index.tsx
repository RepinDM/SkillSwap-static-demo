import type { TFilters } from "@/entities/filters/type";
import FiltersSidebar from "@/features/filter-sidebar/FilterSidebar";
import { useAppSelector } from "@/services/hooks";
import CatalogSection from "@/widgets/CatalogSection/CatalogSection";
import { useMemo, useState } from "react";

const CatalogPage = () => {
  const { allSkillCards, isLoading } = useAppSelector(state => state.skillCards);

  const [filters, setFilters] = useState<TFilters>({
    mode: "all",
    gender: null,
    cities: [],
    skillIds: [],
  });

  const filteredCards = useMemo(() => {
    return allSkillCards.filter(card => {
      const cityName = card.user.city?.name;

      // Фильтр по полу
      if (filters.gender) {
        if (!card.user.gender) return false;
        if (filters.gender !== card.user.gender) return false;
      }

      // Фильтр по городу
      if (filters.cities.length > 0 && (!cityName || !filters.cities.includes(cityName))) return false;
        
      // Фильтр по навыкам только если выбран хотя бы один
      if (filters.skillIds.length > 0) {
        if (filters.mode === "learn") {
          if (!card.learnSkills.some(skill => filters.skillIds.includes(skill.subcategory.id))) return false;
        };

        if (filters.mode === "teach") {
          if (!filters.skillIds.includes(card.teachSkill.subcategory.id)) return false;
        };
      };

      // Если mode выбран, но навыки не выбраны — показываем все карточки
        return true;
    });
  }, [allSkillCards, filters]);

  if (isLoading) return <p>Loading...</p>;


  // Для "Популярного", "Рекомендуемого" и "Нового"
  const popularCards = allSkillCards;
  const recommendedCards = allSkillCards;


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
            <CatalogSection title="Рекомендуем" skillCards={recommendedCards} />
          </>
        }

        {filters.mode !== "all" && (
          <CatalogSection title="Результаты поиска" skillCards={filteredCards} />
        )};
      </div>
    </div>
  );

}

export default CatalogPage;