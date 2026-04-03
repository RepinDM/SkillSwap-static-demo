import { useAppSelector } from "@/services/hooks";
import CatalogSection from "@/widgets/CatalogSection/CatalogSection"; 

const CatalogPage = () => {
  const { skillCards, isLoading } = useAppSelector((state) => state.skillCards);

  if (isLoading) return <p>Loading...</p>;

  return (
    <main>
      <CatalogSection 
        title="Популярное" 
        skillCards={skillCards}
      />

      <CatalogSection 
        title="Новое" 
        skillCards={skillCards}
        // onViewAll={() => console.log("Переход ко всем навыкам")}
      />

      <CatalogSection 
        title="Рекомендуем" 
        skillCards={skillCards}
        // onViewAll={() => console.log("Переход ко всем навыкам")}
      />
    </main>
  );
}

export default CatalogPage;