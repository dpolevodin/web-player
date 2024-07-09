import {
  MutableRefObject,
  useRef,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
  type ChangeEvent,
} from "react";

type Response = {
  isPlaying: boolean;
  currentTime: number;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  audioRef: MutableRefObject<HTMLAudioElement | null>;
  togglePlay: VoidFunction;
  duration: number;
  onLoadedMetadata: VoidFunction;
  targetTime: number;
  setTargetTime: Dispatch<SetStateAction<number>>;
  setCurrentTimeHandler: (e: ChangeEvent<HTMLAudioElement>) => void;
};

export const useAudio = (): Response => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [targetTime, setTargetTime] = useState(0);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play();
      setIsPlaying(true);
    }
  };

  /** Изменение текущего времени проигрыша дорожки пользователем */
  useEffect(() => {
    if (audioRef?.current?.currentTime) {
      audioRef.current.currentTime = targetTime;
    }
  }, [targetTime]);

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef?.current?.duration);
    }
  };

  const setCurrentTimeHandler = (e: ChangeEvent<HTMLAudioElement>) => {
    setCurrentTime(e.currentTarget.currentTime);
  };

  return {
    isPlaying,
    setIsPlaying,
    audioRef,
    togglePlay,
    duration,
    setCurrentTimeHandler,
    onLoadedMetadata,
    targetTime,
    setTargetTime,
    currentTime,
  };
};
