import defaultTrack from "../assets/audio/default_track.mp3";
import { AUDIO_ID } from "../config/constants";

type Options = {
  trackUrl?: string;
};

type Response = {
  play: () => void;
  pause: () => void;
};

export const useAudio = (): Response => {
  // TODO: не срабатывает при первом рендере
  const audioElement = document.getElementById(AUDIO_ID) as HTMLAudioElement;

  console.log(audioElement, "audioElement");

  const play = () => {
    audioElement?.play();
  };

  const pause = () => {
    audioElement?.pause();
  };

  return {
    play,
    pause,
  };
};
