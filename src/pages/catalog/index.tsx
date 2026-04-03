import { convertSkillsToCards, getUserSkills } from "@/api/skillswap-api";
import type { TSkillCard } from "@/entities/skill/types";
// Импортируем новый виджет, который сделал разработчик
import CatalogSection from "@/widgets/CatalogSection/CatalogSection"; 
import { useEffect, useState } from "react";

const CatalogPage = () => {
  const [skillCards, setSkillCards] = useState<TSkillCard[]>([]);

  useEffect(() => {
    getUserSkills().then((data) => {
      setSkillCards(convertSkillsToCards(data.userSkillList, data.userList));
    });
  }, []);

  return (
    <main>
      {/* 
         Используем CatalogSection. 
         Он сам внутри сделает .map и применит стили сетки (3 в ряд)
      */}
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