import React, { useEffect, useState } from "react";
import { ConfigProvider, Carousel, Space, theme } from "antd";
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
import { MOCK_DATA } from "./shared/mocks";
import { FileNameText } from "./shared/ui/FileNameText";
import { UnorderedListOutlined } from "@ant-design/icons";
import { TrackListButton } from "./shared/ui/TrackListButton";

const REQUEST_IMAGE_COUNT = 10;
const DEFAULT_IMAGE_URL = {
  title: "A Year of Assessing Astronomical Hazards",
  url: "https://apod.nasa.gov/apod/image/2011/IMG_20201124052235_9280_px1050.jpg",
  copyright: "Nasa",
};
// TODO: нужна привязка к относительным значениям
const MAIN_CONTENT_WIDTH = "212px";

type AudioFile = { src: string; name: string };

function App() {
  const { darkMode, handleChangeDarkMode } = useDarkMode();
  const [audioFile, setAudioFile] = useState<AudioFile | null>(null);
  const [data, setData] = useState<SpaceImagesResponse>([DEFAULT_IMAGE_URL]);
  const [favorite, addToFavorite] = useState(false);
  const [trackListView, setTrackListView] = useState(false);

  useEffect(() => {
    fetch(
      // TODO: вернуть обратно на корректную ссылку
      // `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=${REQUEST_IMAGE_COUNT}`
      `https://test/planetary/apod?api_key=DEMO_KEY&count=${REQUEST_IMAGE_COUNT}`
    )
      .then((response) => response.json())
      .then((data: SpaceImagesResponse) => {
        const randomItem = data[Math.floor(Math.random() * data.length)];
        if (randomItem) {
          setData(data);
        }
      })
      .catch(() => {
        setData(MOCK_DATA);
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
  } = useAudio(audioFile?.src);

  const handleForwardClick = () => {
    console.log("forward clicked");
  };

  const handleBackwardClick = () => {
    console.log("backward clicked");
  };

  const handleUpload = (file: UploadFile) => {
    setAudioFile(null);
    if (file) {
      setAudioFile({
        name: file?.name ?? "unknown",
        src: URL.createObjectURL(file as unknown as File),
      });
    }
  };

  const handleTrackListButtonClick = () => {
    setTrackListView((prevState) => !prevState);
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
          <Space
            direction="vertical"
            size="small"
            align="center"
            style={{
              position: "absolute",
              transform: trackListView ? "translate(150%)" : "translate(0)",
              transition: "all 0.15s linear",
              opacity: !trackListView ? 1 : 0,
            }}
          >
            <HeaderBlock
              onUpload={handleUpload}
              addedToFavorite={favorite}
              onAddToFavorite={() => {
                addToFavorite((prev) => !prev);
              }}
            />
            <ImageWithDescription
              imagesData={data}
              width={MAIN_CONTENT_WIDTH}
            />
            {audioFile && (
              <FileNameText playing={isPlaying}>{audioFile.name}</FileNameText>
            )}
            <ProgressSlider
              disabled={!audioFile}
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
              disabled={!audioFile}
            />
          </Space>

          <Space
            direction="vertical"
            size="small"
            align="start"
            style={{
              position: "absolute",
              height: 480,
              width: MAIN_CONTENT_WIDTH,
              transform: !trackListView ? "translate(150%)" : "translate(0)",
              transition: "all 0.15s linear",
              opacity: trackListView ? 1 : 0,
            }}
          >
            Track list
          </Space>

          <TrackListButton
            onClick={handleTrackListButtonClick}
            isTrackListView={trackListView}
          />
        </PhoneContainer>
      </ThemeContainer>
      <ThemeSwitcher onClick={handleChangeDarkMode} isDarkMode={darkMode} />
    </ConfigProvider>
  );
}

export default App;
