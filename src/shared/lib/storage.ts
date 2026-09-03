export const readStoredJson = <T>(key: string, fallback: T): T => {
  const value = localStorage.getItem(key);

  if (!value) {
    return fallback;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    localStorage.removeItem(key);
    return fallback;
  }
};

export const writeStoredJson = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
};
