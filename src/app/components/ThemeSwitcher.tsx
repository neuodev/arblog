import React, { useCallback, useEffect, useMemo, useState } from "react";
import DarkTheme from "src/svg/DarkTheme";
import LightTheme from "src/svg/LightTheme";

enum Theme {
  Light = "light",
  Dark = "dark",
}

const THEME_KEY = "theme";

function getCurrentTheme(): Theme {
  if (typeof window === "undefined") return Theme.Light;
  const theme = localStorage.getItem(THEME_KEY);
  if (theme === Theme.Light || theme === Theme.Dark) return theme;
  return Theme.Light;
}

const ThemeSwitcher: React.FC<{}> = () => {
  const [theme, setTheme] = useState<Theme | null>(null);

  const toggleTheme = useCallback(() => {
    localStorage.setItem(
      THEME_KEY,
      theme === Theme.Light ? Theme.Dark : Theme.Light
    );
    setTheme(getCurrentTheme());
  }, [theme]);

  useEffect(() => {
    if (theme === Theme.Light) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [theme]);

  useEffect(() => {
    setTheme(getCurrentTheme());
  }, []);

  return (
    <button
      onClick={toggleTheme}
      className="bg-sky-100 hover:bg-sky-200 dark:bg-slate-700 dark:hover:bg-slate-600 pb-4 pl-4 pt-1 pr-1 rounded-bl-full transition-colors duration-300 absolute"
    >
      {theme === Theme.Light ? (
        <DarkTheme className="w-6 h-6 stroke-sky-500" />
      ) : (
        <LightTheme className="w-6 h-6 stroke-sky-500" />
      )}
    </button>
  );
};

export default ThemeSwitcher;
