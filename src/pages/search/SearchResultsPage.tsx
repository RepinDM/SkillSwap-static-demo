import { useAppSelector, useAppDispatch } from "@/services/hooks"
import { SkillCardsList } from "@/shared/ui/Search/SkillCardsList"
import { useSearchParams } from "react-router-dom"
import { setSearchQuery } from "@/services/slices/skillCardsSlice"
import { useEffect } from "react"

export const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const query = searchParams.get("q") || "";
  
  useEffect(() => {
    dispatch(setSearchQuery(query))
  }, [query, dispatch])

  const filteredCards = useAppSelector((state) => state.skillCards.searchFilteredSkillCards)

  return <SkillCardsList cards={filteredCards}/>
}
