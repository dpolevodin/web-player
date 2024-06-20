import React, { useState } from "react";
import { ConfigProvider, theme } from "antd";
import { ThemeSwitcher } from "./shared/ui/ThemeSwitcher";
import { useDarkMode } from "./shared/hooks/useDarkMode";
import { ThemeContainer } from "./shared/ui/ThemeContainer";
import "./App.module.css";
import { PhoneContainer } from "./shared/ui/PhoneContainer";
import { ControlsButtonGroup } from "./shared/ui/ControlsButtonGroup";

function App() {
  const { darkMode, handleChangeDarkMode } = useDarkMode();
  const [playing, setPlaying] = useState(false);

  const handlePlayClick = () => {
    console.log("play clicked");
    setPlaying((prev) => !prev);
  };

  const handleForwardClick = () => {
    console.log("forward clicked");
  };

  const handleBackwardClick = () => {
    console.log("backward clicked");
  };

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
          <ControlsButtonGroup
            playing={playing}
            onPlayClick={handlePlayClick}
            onBackwardClick={handleForwardClick}
            onForwardClick={handleBackwardClick}
          />
        </PhoneContainer>
      </ThemeContainer>
      <ThemeSwitcher onClick={handleChangeDarkMode} isDarkMode={darkMode} />
    </ConfigProvider>
  );
}

export default App;
