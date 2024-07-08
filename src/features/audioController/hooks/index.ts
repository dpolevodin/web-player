import {
  MutableRefObject,
  useRef,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
// TODO: remove it?
// import defaultTrack from "../assets/audio/default_track.mp3";
// import { AUDIO_ID } from "../config/constants";

type Options = {
  trackUrl?: string;
};

type Response = {
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  audioRef: MutableRefObject<HTMLAudioElement | null>;
  togglePlay: VoidFunction;
  duration: number;
  currentTime: number;
};

export const useAudio = (): Response => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  console.log(currentTime, "currentTime");

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (audioRef?.current?.duration) {
      setDuration(audioRef?.current?.duration);
    }
  }, [audioRef?.current]);

  // useEffect(() => {
  //   if (audioRef?.current?.currentTime) {
  //     setCurrentTime(audioRef?.current?.currentTime);
  //   }
  // }, [audioRef?.current?.currentTime]);

  useEffect(() => {
    let interval: NodeJS.Timer;
    if (!!audioRef?.current && audioRef?.current?.currentTime) {
      interval = setInterval(() => {
        setCurrentTime(audioRef.current.currentTime);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [audioRef?.current?.currentTime]);
  return {
    isPlaying,
    setIsPlaying,
    audioRef,
    togglePlay,
    duration,
    currentTime,
  };
};
