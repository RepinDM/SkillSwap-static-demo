export type Option = {
  label: string;
  value: string;
};

export const GENDERS: Option[] = [
  { value: "", label: "Не указан" },
  { value: "male", label: "Мужской" },
  { value: "female", label: "Женский" },
];