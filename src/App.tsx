import React from "react";
import { Button, ConfigProvider, Space, theme } from "antd";
import { ThemeSwitcher } from "./shared/ui/ThemeSwitcher";
import style from "./App.module.css";
import { useDarkMode } from "./shared/hooks/useDarkMode";

function App() {
  const { darkMode, handleChangeDarkMode } = useDarkMode();

  return (
    <ConfigProvider
      theme={{
        token: {
          // TODO: собрать тему для приложения g
          // colorPrimary: "#b9009d",
          borderRadius: 12,
        },
        algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <Space direction="vertical" align="center" className={style.container}>
        <Button type="primary">Primary</Button>
        <Button>Default</Button>
      </Space>
      <ThemeSwitcher onClick={handleChangeDarkMode} isDarkMode={darkMode} />
    </ConfigProvider>
  );
}

export default App;
