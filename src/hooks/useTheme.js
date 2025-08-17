import { useContext } from "react";
import { Themecontext } from "../Context/ThemeContext";

const useTheme = () => {
  const context = useContext(Themecontext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};

export default useTheme;
