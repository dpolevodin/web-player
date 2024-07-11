import React, { ChangeEvent, useEffect, useState } from "react";
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
import { HeaderBlock } from "./shared/ui/HeaderBlock";
import type { UploadFile } from "antd";
import type { SpaceImagesResponse } from "./shared/types/imageTypes";

const REQUEST_IMAGE_COUNT = 10;
const DEFAULT_IMAGE_URL = {
  title: "A Year of Assessing Astronomical Hazards",
  url: "https://apod.nasa.gov/apod/image/2011/IMG_20201124052235_9280_px1050.jpg",
};
// TODO: нужна привязка к относительным значениям
const MAIN_CONTENT_WIDTH = "212px";

function App() {
  const { darkMode, handleChangeDarkMode } = useDarkMode();
  const [audioFileSrc, setAudioFileSrc] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState<{
    url: string;
    title: string;
  } | null>(null);

  useEffect(() => {
    console.log("i fire once");
    fetch(
      // `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=${REQUEST_IMAGE_COUNT}`
      `https://test/planetary/apod?api_key=DEMO_KEY&count=${REQUEST_IMAGE_COUNT}`
    )
      .then((response) => response.json())
      .then((data: SpaceImagesResponse) => {
        const mappedData = data?.map((item) => ({
          url: item.url,
          title: item.title,
        }));
        const randomImageItem =
          mappedData[Math.floor(Math.random() * mappedData.length)];
        if (randomImageItem) {
          setCurrentImage(randomImageItem);
        }
      })
      .catch(() => {
        setCurrentImage(DEFAULT_IMAGE_URL);
      });
  }, []);

  const {
    isPlaying,
    audioRef,
    togglePlay,
    duration,
    currentTime,
    setCurrentTimeHandler,
    onLoadedMetadata,
    setTargetTime,
  } = useAudio(audioFileSrc);

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

  const handleUpload = (file: UploadFile) => {
    if (file) {
      setAudioFileSrc(URL.createObjectURL(file as unknown as File));
    }
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
            <HeaderBlock onUpload={handleUpload} />
            <ImageWithDescription
              width={MAIN_CONTENT_WIDTH}
              src={currentImage?.url ?? undefined}
              trackInfo={{ title: currentImage?.title, group: "Nasa group" }}
            />
            <ProgressSlider
              disabled={!audioFileSrc}
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
              disabled={!audioFileSrc}
            />
          </Space>
        </PhoneContainer>
      </ThemeContainer>
      <ThemeSwitcher onClick={handleChangeDarkMode} isDarkMode={darkMode} />
    </ConfigProvider>
  );
}

export default App;
