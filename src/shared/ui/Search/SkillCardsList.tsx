import CatalogSection from "@/widgets/CatalogSection/CatalogSection";
import type { TSkillCard } from "@/entities/skill/types";

type Props = {
  cards: TSkillCard[];
};

export const SkillCardsList = ({cards}: Props) => {
  return <CatalogSection title="" skillCards={cards}/>
}
