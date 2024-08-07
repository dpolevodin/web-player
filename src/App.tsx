import { useEffect, useState } from "react";
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
import { MOCK_DATA } from "./shared/mocks";
import { FileNameText } from "./shared/ui/FileNameText";
import { FooterButtonsGroup } from "./shared/ui/FooterButtonsGroup";
import classNames from "classnames";
import styles from "./App.module.css";
import { TrackList } from "./shared/ui/TrackList";
import { AudioFile } from "./shared/types/types";
import { getFileDuration } from "./shared/hooks/useFileDuration";

// TODO: доделать бесконечный список
const REQUEST_IMAGE_COUNT = 15;
const DEFAULT_IMAGE_URL = {
  title: "A Year of Assessing Astronomical Hazards",
  url: "https://apod.nasa.gov/apod/image/2011/IMG_20201124052235_9280_px1050.jpg",
  copyright: "Nasa",
};
// TODO: нужна привязка к относительным значениям
const MAIN_CONTENT_WIDTH = "208px";
const MAIN_CONTENT_HEIGHT = "480px";

const findNextAndPreviousFile = (
  currentFile: AudioFile,
  list: AudioFile[],
  key?: "next"
): AudioFile => {
  const currentFileIndex = list.findIndex(
    (file) => file.uid === currentFile.uid
  );
  if (key === "next") {
    return currentFileIndex === list?.length - 1
      ? list[0]
      : list[currentFileIndex + 1];
  }
  return currentFileIndex === 0
    ? list[list?.length - 1]
    : list[currentFileIndex - 1];
};

function App() {
  const { darkMode, handleChangeDarkMode } = useDarkMode();
  const [audioFiles, setAudioFiles] = useState<AudioFile[]>([]);
  const [data, setData] = useState<SpaceImagesResponse>([DEFAULT_IMAGE_URL]);
  const [trackListView, setTrackListView] = useState(false);
  const [currentFile, setCurrentFile] = useState<AudioFile | null>(null);
  const [favoritesList, setFavoritesList] = useState<string[]>([]);

  useEffect(() => {
    const lastElement = audioFiles.at(-1);
    if (!!audioFiles.length && lastElement) {
      setCurrentFile(lastElement);
    }
  }, [audioFiles]);

  const isFavorite =
    !!currentFile?.uid && favoritesList?.includes(currentFile?.uid);

  useEffect(() => {
    fetch(
      // TODO: вернуть обратно на корректную ссылку
      `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=${REQUEST_IMAGE_COUNT}`
      // `https://test/planetary/apod?api_key=DEMO_KEY&count=${REQUEST_IMAGE_COUNT}`
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
    fileInfo,
    isMuted,
    setIsMuted,
    reset,
  } = useAudio(currentFile);

  const handleForwardClick = () => {
    if (currentFile) {
      const next = findNextAndPreviousFile(currentFile, audioFiles, "next");
      setCurrentFile(next);
    }
  };

  const handleBackwardClick = () => {
    if (currentFile) {
      const previous = findNextAndPreviousFile(currentFile, audioFiles);
      setCurrentFile(previous);
    }
  };

  const handleUpload = async (file: UploadFile) => {
    if (file) {
      const { duration, src } = await getFileDuration<HTMLAudioElement>(file);
      setAudioFiles((state) => [
        ...state,
        {
          name: file?.name ?? "unknown",
          uid: file.uid,
          duration,
          src,
        },
      ]);
    }
  };

  const handleTrackListButtonClick = () => {
    setTrackListView((prevState) => !prevState);
  };

  const handleAddToFavoriteButtonClick = () => {
    if (currentFile) {
      const fileUid = currentFile?.uid;
      setFavoritesList((state) =>
        state?.includes(fileUid)
          ? state.filter((uid) => uid !== fileUid)
          : [...state, currentFile?.uid]
      );
    }
  };

  const handleMuteClick = () => {
    if (setIsMuted) {
      setIsMuted((state) => !state);
    }
  };

  const handleTrackDeleteClick = (uid: string) => {
    if (currentFile?.uid === uid && reset) {
      setCurrentFile(null);
      reset();
    }
    setAudioFiles((state) => state?.filter((file) => file.uid !== uid));
  };

  return (
    <ConfigProvider
      theme={{
        token: {
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
        />
        <PhoneContainer isDarkMode={darkMode}>
          <Space
            direction="vertical"
            size="small"
            align="center"
            className={classNames(styles.smoothScrollPage, {
              [styles.screenIn]: !trackListView,
              [styles.screenOut]: trackListView,
            })}
          >
            <HeaderBlock
              onUpload={handleUpload}
              addedToFavorite={isFavorite}
              onAddToFavorite={handleAddToFavoriteButtonClick}
              addedToFavoriteDisabled={!currentFile}
            />
            <ImageWithDescription
              imagesData={data}
              width={MAIN_CONTENT_WIDTH}
            />
            {currentFile && (
              <FileNameText playing={isPlaying}>
                {currentFile.name}
              </FileNameText>
            )}
            <ProgressSlider
              disabled={!audioFiles?.length}
              max={duration}
              min={0}
              value={currentTime}
              onChange={setTargetTime}
              defaultValue={0}
              width={MAIN_CONTENT_WIDTH}
            />
            <ControlsButtonGroup
              playing={isPlaying}
              onPlayClick={togglePlay}
              onBackwardClick={handleBackwardClick}
              onForwardClick={handleForwardClick}
              disabled={!audioFiles?.length}
              stepButtonDisabled={audioFiles?.length < 2}
            />
          </Space>
          <TrackList
            onItemClick={setCurrentFile}
            list={audioFiles}
            playingFileInfo={fileInfo}
            style={{
              height: MAIN_CONTENT_HEIGHT,
              width: 256,
              maxHeight: MAIN_CONTENT_HEIGHT,
              overflowY: "auto",
              overflowX: "hidden",
            }}
            className={classNames(styles.smoothScrollPage, {
              [styles.screenIn]: trackListView,
              [styles.screenOut]: !trackListView,
            })}
            deleteButtonOnClick={handleTrackDeleteClick}
          />
          <FooterButtonsGroup
            onListClick={handleTrackListButtonClick}
            isTrackListView={trackListView}
            onMuteClick={handleMuteClick}
            isMuted={isMuted}
            muteDisabled={!currentFile}
          />
        </PhoneContainer>
      </ThemeContainer>
      <ThemeSwitcher onClick={handleChangeDarkMode} isDarkMode={darkMode} />
    </ConfigProvider>
  );
}

export default App;
