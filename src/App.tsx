import React, { useEffect, useState } from "react";
import { ConfigProvider, Space, theme, Image, Slider } from "antd";
import { ThemeSwitcher } from "./shared/ui/ThemeSwitcher";
import { useDarkMode } from "./shared/hooks/useDarkMode";
import { ThemeContainer } from "./shared/ui/ThemeContainer";
import "./App.module.css";
import { PhoneContainer } from "./shared/ui/PhoneContainer";
import { ControlsButtonGroup } from "./shared/ui/ControlsButtonGroup";
import { ProgressSlider } from "./shared/ui/ProgressSlider";
import { ImageWithDescription } from "./shared/ui/ImageWithDescription";

// TODO: нужна привязка к относительным значениям
const MAIN_CONTENT_WIDTH = "212px";

function App() {
  const { darkMode, handleChangeDarkMode } = useDarkMode();
  const [playing, setPlaying] = useState(false);
  const [playingTime, setPlayingTime] = useState(0);
  const [playingMaxTime, setMaxPlayingTime] = useState(60);

  const trackInfo = {
    title: "С Днем рождения!",
    group: "Барбарики",
  };

  // TODO: delete this debugging
  console.log(playingTime, "playingTime");

  // TODO: заменить на музыкальный прогресс
  useEffect(() => {
    const interval = setInterval(() => {
      setPlayingTime((prev) => (prev += 1));
    }, 1000);

    if (playingTime >= playingMaxTime) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [playingTime, playingMaxTime]);

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
          // colorPrimary: "#706c6c",
          borderRadius: 12,
        },
        algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <ThemeContainer isDarkMode={darkMode}>
        <PhoneContainer isDarkMode={darkMode}>
          <Space direction="vertical" size="small" align="center">
            <ImageWithDescription
              width={MAIN_CONTENT_WIDTH}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              trackInfo={trackInfo}
            />
            <ProgressSlider
              max={playingMaxTime}
              min={0}
              value={playingTime}
              onChange={(value) => {
                setPlayingTime(value);
              }}
              defaultValue={0}
              width={MAIN_CONTENT_WIDTH}
              onChangeComplete={() => {
                console.log("onChangeCompleted");
              }}
            />
            <ControlsButtonGroup
              playing={playing}
              onPlayClick={handlePlayClick}
              onBackwardClick={handleForwardClick}
              onForwardClick={handleBackwardClick}
            />
          </Space>
        </PhoneContainer>
      </ThemeContainer>
      <ThemeSwitcher onClick={handleChangeDarkMode} isDarkMode={darkMode} />
    </ConfigProvider>
  );
}

export default App;
