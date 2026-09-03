import { useState, useEffect } from "react";
import { readStoredJson, writeStoredJson } from "@/shared/lib/storage";

export const useLocalList = <T>(key: string, initial: T[] = []) => {
  const [list, setList] = useState<T[]>(() => {
    return readStoredJson(key, initial);
  });

  useEffect(() => {
    writeStoredJson(key, list);
  }, [list, key]);

  return [list, setList] as const;
};
