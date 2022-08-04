import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export const useTheme = () => {
  const context = useContext(ThemeContext)

  if (context === undefined) {
    // Cant use this context unless the component thats using it is inside the theme provider
    throw new Error('useTheme() must be used inside a ThemeProvider')
  }

  
  return context
}