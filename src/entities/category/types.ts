// Категория навыков
export type TCategory = {
  id: number // Уникальный идентификатор категории
  name: string // Название категории
}

// Подкатегория навыков
export type TSubcategory = {
  id: number // Уникальный идентификатор подкатегории
  category: TCategory // ID родительской категории
  name: string // Название подкатегории
}