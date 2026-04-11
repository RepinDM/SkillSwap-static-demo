export interface MockUserProfile {
  id: number;
  email: string;
  name: string;
  birthDate: string;
  gender: "male" | "female" | "other";
  cityId: string;
  about: string;
  avatar: string;
}

export const MOCK_USER: MockUserProfile = {
  id: 2,
  email: "ivan.petrov@example.com",
  name: "Иван Петров",
  birthDate: "1992-04-14",
  gender: "male",
  cityId: "2",
  about:
    "Люблю музыку, путешествия и учить новые языки. Ищу партнёров для обмена навыками!",
  avatar:
    "http://skillswap.ovnet.ru/media/images/avatar-ivan.2e16d0ba.fill-200x200.jpg",
};
