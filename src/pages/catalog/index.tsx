import { convertSkillsToCards, getUserSkills } from "@/api/skillswap-api";
import type { TSkillCard } from "@/entities/skill/types";
import { SkillCard } from "@/widgets/SkillCard/SkillCard";
import { useEffect, useState } from "react";

const CatalogPage = () =>{
 const [skillCards, setSkillCards] = useState<TSkillCard[]>([]);

  useEffect(() => {
    getUserSkills().then((data) => {
      setSkillCards(convertSkillsToCards(data));
    });
  }, []);

  return (
    <>
      <h1>Каталог обмена навыками</h1>
      {skillCards.map((card) => (
        <SkillCard card={card}/>
      ))}
    </>
  )
}

export default CatalogPage;