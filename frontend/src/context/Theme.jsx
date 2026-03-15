import React, { createContext, useContext, useEffect, useState } from "react";

const Theme = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Get initial theme from localStorage or fallback to "light"
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    // Apply/remove the "dark" class based on theme
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Save to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <Theme.Provider value={{ theme, toggleTheme }}>
      {children}
    </Theme.Provider>
  );
};

export const useTheme = () => useContext(Theme);
