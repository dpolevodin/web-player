import {
  MutableRefObject,
  useRef,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
  type ChangeEvent,
} from "react";
import type { AudioFile } from "../../../shared/types/types";

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
  fileInfo?: AudioFile;
  isMuted?: boolean;
  setIsMuted?: Dispatch<SetStateAction<boolean>>;
  reset?: VoidFunction;
};

export const useAudio = (file: AudioFile | null): Response => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [targetTime, setTargetTime] = useState(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    setDuration(0);
    setCurrentTime(0);
    setTargetTime(0);
    if (audioRef.current && file?.src) {
      audioRef.current.src = file.src;
      audioRef?.current?.play();
      setIsPlaying(true);
    }
  }, [file]);

  const reset = () => {
    setDuration(0);
    setCurrentTime(0);
    setTargetTime(0);
    setIsPlaying(false);
    setIsMuted(false);
    if (audioRef?.current) {
      audioRef.current?.pause();
    }
  };

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

  /** Изменение состояния флага muted */
  useEffect(() => {
    if (audioRef?.current && isMuted) {
      audioRef.current.muted = true;
    }
    if (audioRef?.current && !isMuted) {
      audioRef.current.muted = false;
    }
  }, [isMuted]);

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
    fileInfo: file ? { ...file, playing: isPlaying } : undefined,
    isMuted,
    setIsMuted,
    reset,
  };
};
