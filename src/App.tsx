import React from "react";
import { Button, ConfigProvider, theme } from "antd";
import { ThemeSwitcher } from "./shared/ui/ThemeSwitcher";
import { useDarkMode } from "./shared/hooks/useDarkMode";
import { ThemeContainer } from "./shared/ui/ThemeContainer";
import "./App.module.css";
import { PhoneContainer } from "./shared/ui/phoneContainer";

function App() {
  const { darkMode, handleChangeDarkMode } = useDarkMode();

  return (
    <ConfigProvider
      theme={{
        token: {
          // TODO: собрать тему для приложения g
          // colorPrimary: "#aeaeae",
          borderRadius: 12,
        },
        algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <ThemeContainer isDarkMode={darkMode}>
        <PhoneContainer isDarkMode={darkMode}>
          <Button type="primary" style={{ marginBottom: 8 }}>
            Primary
          </Button>
          <Button>Default</Button>
        </PhoneContainer>
      </ThemeContainer>
      <ThemeSwitcher onClick={handleChangeDarkMode} isDarkMode={darkMode} />
    </ConfigProvider>
  );
}

export default App;
