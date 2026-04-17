import { useState, useEffect } from "react";

export const useLocalList = <T>(key: string, initial: T[] = []) => {
  const [list, setList] = useState<T[]>(() => {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : initial;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(list));
  }, [list, key]);

  return [list, setList] as const;
};