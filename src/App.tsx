import React from "react";
import { ConfigProvider, Space, theme } from "antd";
import { ThemeSwitcher } from "./shared/ui/ThemeSwitcher";
import { useDarkMode } from "./shared/hooks/useDarkMode";
import { ThemeContainer } from "./shared/ui/ThemeContainer";
import { PhoneContainer } from "./shared/ui/PhoneContainer";
import { ControlsButtonGroup } from "./shared/ui/ControlsButtonGroup";
import { ProgressSlider } from "./shared/ui/ProgressSlider";
import { ImageWithDescription } from "./shared/ui/ImageWithDescription";
import "./App.module.css";
import { useAudio, AudioController } from "./features/audioController";
import { UploadButton } from "./shared/ui/UploadButton";

// TODO: нужна привязка к относительным значениям
const MAIN_CONTENT_WIDTH = "212px";

function App() {
  const { darkMode, handleChangeDarkMode } = useDarkMode();

  const {
    isPlaying,
    audioRef,
    togglePlay,
    duration,
    currentTime,
    setCurrentTimeHandler,
    onLoadedMetadata,
    setTargetTime,
  } = useAudio();

  const trackInfo = {
    title: "С Днем рождения!",
    group: "Барбарики",
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
        <AudioController
          ref={audioRef}
          onLoadedMetadata={onLoadedMetadata}
          onTimeUpdate={setCurrentTimeHandler}
          onEnded={() => {
            console.log("Track ended");
          }}
        />
        <PhoneContainer isDarkMode={darkMode}>
          <Space direction="vertical" size="small" align="center">
            <ImageWithDescription
              width={MAIN_CONTENT_WIDTH}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              trackInfo={trackInfo}
            />
            <ProgressSlider
              max={duration}
              min={0}
              value={currentTime}
              onChange={setTargetTime}
              defaultValue={0}
              width={MAIN_CONTENT_WIDTH}
              onChangeComplete={(value) => {
                console.log("onChangeCompleted", value);
              }}
            />
            <ControlsButtonGroup
              playing={isPlaying}
              onPlayClick={togglePlay}
              onBackwardClick={handleBackwardClick}
              onForwardClick={handleForwardClick}
            />
            <UploadButton />
          </Space>
        </PhoneContainer>
      </ThemeContainer>
      <ThemeSwitcher onClick={handleChangeDarkMode} isDarkMode={darkMode} />
    </ConfigProvider>
  );
}

export default App;
