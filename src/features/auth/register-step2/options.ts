export type Option = {
  label: string;
  value: string;
};

export const GENDERS: Option[] = [
  { value: "", label: "Не указан" },
  { value: "male", label: "Мужской" },
  { value: "female", label: "Женский" },
];

export const CITIES: Option[] = [
  { value: "1", label: "Москва" },
  { value: "2", label: "Санкт-Петербург" },
  { value: "3", label: "Самара" },
  { value: "4", label: "Саратов" },
  { value: "5", label: "Казань" },
  { value: "6", label: "Новосибирск" },
  { value: "7", label: "Екатеринбург" },
];

export const CATEGORIES: Option[] = [
  { value: "1", label: "Бизнес и карьера" },
  { value: "2", label: "Творчество и искусство" },
  { value: "3", label: "Иностранные языки" },
  { value: "4", label: "Образование и развитие" },
  { value: "5", label: "Здоровье и лайфстайл" },
  { value: "6", label: "Дом и уют" },
];

export const SUBCATEGORIES: Record<string, Option[]> = {
  "1": [
    { value: "11", label: "Маркетинг и реклама" },
    { value: "12", label: "Управление проектами" },
    { value: "13", label: "Финансы и инвестиции" },
  ],
  "2": [
    { value: "21", label: "Рисование и иллюстрация" },
    { value: "22", label: "Фотография" },
    { value: "23", label: "Видеомонтаж" },
    { value: "24", label: "Музыка и звук" },
    { value: "25", label: "Актёрское мастерство" },
    { value: "26", label: "Креативное письмо" },
    { value: "27", label: "Арт-терапия" },
    { value: "28", label: "Декор и DIY" },
  ],
  "3": [
    { value: "31", label: "Английский" },
    { value: "32", label: "Французский" },
    { value: "33", label: "Испанский" },
  ],
  "4": [
    { value: "41", label: "Навыки обучения" },
    { value: "42", label: "Когнитивные техники" },
    { value: "43", label: "Тайм-менеджмент" },
  ],
  "5": [
    { value: "51", label: "Йога и медитация" },
    { value: "52", label: "Питание и ЗОЖ" },
    { value: "53", label: "Фитнес" },
  ],
  "6": [
    { value: "61", label: "Приготовление еды" },
    { value: "62", label: "Ремонт" },
    { value: "63", label: "Садоводство" },
  ],
};
