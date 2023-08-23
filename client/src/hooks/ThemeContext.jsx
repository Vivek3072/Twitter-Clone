import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [modeClass, setModeClass] = useState("bg-white");

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) setModeClass("bg-gray-900");
    else setModeClass("bg-white");
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, modeClass, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
