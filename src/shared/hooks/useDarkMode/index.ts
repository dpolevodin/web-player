import { useState } from "react";

type ReturnValue = {
  darkMode: boolean;
  handleChangeDarkMode: VoidFunction;
};

export const useDarkMode = (): ReturnValue => {
  const [darkMode, setDarkMode] = useState(false);

  const handleChangeDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return {
    darkMode,
    handleChangeDarkMode,
  };
};
