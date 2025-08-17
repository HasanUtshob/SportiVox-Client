import React, { useEffect, useState } from "react";
import { Themecontext } from "./ThemeContext";

const ThemeProvider = ({ children }) => {
  const [darkmode, setDarkmode] = useState(
    localStorage.getItem("Theme") === "dark"
  );

  useEffect(() => {
    if (darkmode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("Theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("Theme", "light");
    }
  }, [darkmode]);

  return (
    <Themecontext.Provider value={{ darkmode, setDarkmode }}>
      {children}
    </Themecontext.Provider>
  );
};

export default ThemeProvider;
