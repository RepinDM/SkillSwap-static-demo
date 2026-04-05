import {useAppSelector} from "@/services/hooks";
import CatalogSection from "@/widgets/CatalogSection/CatalogSection";

const CatalogPage = () => {
  const {allSkillCards, isLoading} = useAppSelector(
    (state) => state.skillCards
  );

  if (isLoading) return <p>Loading...</p>;

  // Показываем ПОКА ЧТО все карточки, потом будем сортировать
  const popularCards = allSkillCards;
  const recommendedCards = allSkillCards;
  const newCards = [...allSkillCards]
    .filter(card => card.teachSkill?.createdDate)
    .sort((a, b) => {
      const dateA = new Date(a.teachSkill.createdDate);
      const dateB = new Date(b.teachSkill.createdDate);
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, 3);

  return (
    <main>
      <CatalogSection
        title="Популярное"
        skillCards={popularCards}
      />

      <CatalogSection
        title="Новое"
        skillCards={newCards}
        // onViewAll={() => console.log("Переход ко всем навыкам")}
      />

      <CatalogSection
        title="Рекомендуем"
        skillCards={recommendedCards}
        // onViewAll={() => console.log("Переход ко всем навыкам")}
      />
    </main>
  );
}

export default CatalogPage;