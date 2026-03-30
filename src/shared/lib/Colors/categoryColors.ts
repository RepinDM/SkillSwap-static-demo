// Цвет тега определяется не напрямую, а через CATEGORY_COLORS.
//   Мы не используем hex в компонентах — только дизайн-токены.
// Тут цвета фонов тега,в

export const CATEGORY_COLORS = {
  'businessCareer': "var(--tag-business-career)",
  'creativityArt': "var(--tag-creativity-art)",
  'foreignLanguages': "var(--tag-foreign-languages)",
  'educationDevelopment': "var(--tag-education-development)",
  'homeComfort': "var(--tag-home-comfort)",
  'healthLifestyle': "var(--tag-health-lifestyle)",
  'plus': "var(--tag-plus)",
} as const;

export type CategoryColorKey = keyof typeof CATEGORY_COLORS;