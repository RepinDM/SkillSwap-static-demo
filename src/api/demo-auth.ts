import type { TUserAuth } from "@/entities/user/types";

const DEMO_USER_KEY = "skillswap-demo-user";
const DEMO_ACCESS_TOKEN = "skillswap-demo-access-token";
const DEMO_REFRESH_TOKEN = "skillswap-demo-refresh-token";

const defaultCity = { id: 0, name: "Не указан" };

const getStoredUser = (): TUserAuth | null => {
  const value = localStorage.getItem(DEMO_USER_KEY);

  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as TUserAuth;
  } catch {
    localStorage.removeItem(DEMO_USER_KEY);
    return null;
  }
};

const saveUser = (user: TUserAuth) => {
  localStorage.setItem(DEMO_USER_KEY, JSON.stringify(user));
  return user;
};

const makeUser = (email: string): TUserAuth => ({
  id: 0,
  email,
  name: email.split("@")[0] || "Пользователь",
  city: defaultCity,
});

export const createDemoSession = (user: TUserAuth) => ({
  accessToken: DEMO_ACCESS_TOKEN,
  refreshToken: DEMO_REFRESH_TOKEN,
  user: saveUser(user),
});

export const loginDemoUser = (email: string, password: string) => {
  if (password.trim().length < 6) {
    throw new Error("Пароль должен содержать не менее 6 символов");
  }

  const storedUser = getStoredUser();
  const user = storedUser?.email === email ? storedUser : makeUser(email);

  return createDemoSession(user);
};

export const updateDemoUser = (user: TUserAuth) => saveUser(user);
