import { useAppSelector } from "@/services/hooks";
import { selectAllSkillCards } from "@/services/slices/skillCardsSlice";
import { selectFavorites } from "@/services/slices/favoritesSlice";
import CatalogSection from "@/widgets/CatalogSection/CatalogSection";

const ProfileFavoritesSection = () => {
  const favorites = useAppSelector(selectFavorites);
  const skillCards = useAppSelector(selectAllSkillCards);
  const favoritesCards = skillCards.filter(card => favorites[card.id]);
  return favoritesCards.length? <CatalogSection title="" skillCards={favoritesCards}/> : <div>В избранном пусто</div>
};

export default ProfileFavoritesSection;