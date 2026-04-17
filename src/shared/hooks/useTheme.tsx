import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

export type TThemeMode = "light" | "dark";

const THEME_STORAGE_KEY = "skillswap-theme";

type TThemeContext = {
  isDark: boolean;
  theme: TThemeMode;
  toggleTheme: () => void;
};

const ThemeContext = createContext<TThemeContext | null>(null);

const isThemeMode = (value: string | null): value is TThemeMode =>
  value === "light" || value === "dark";

const resolveInitialTheme = (): TThemeMode => {
  if (typeof window === "undefined") {
    return "light";
  }

  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

  if (isThemeMode(savedTheme)) {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const applyThemeToDocument = (theme: TThemeMode) => {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
};

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<TThemeMode>(resolveInitialTheme);

  useEffect(() => {
    // Храним активную тему на корневом элементе, чтобы все SCSS-переменные
    // переключались централизованно и без привязки к отдельным страницам.
    applyThemeToDocument(theme);
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      isDark: theme === "dark",
      theme,
      toggleTheme: () => {
        setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
      },
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
};
