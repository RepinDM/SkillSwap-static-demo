// Категория навыков
export type TCategory = {
  id: string; // Уникальный идентификатор категории
  name: string; // Название категории
};


// Подкатегория навыков
export type TSubcategory = {
  id: string; // Уникальный идентификатор подкатегории
  categoryId: string; // ID родительской категории
  name: string; // Название подкатегории
};

// src/entities/category/types.ts