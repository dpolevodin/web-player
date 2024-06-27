import defaultTrack from "../assets/audio/default_track.mp3";

type Options = {
  trackUrl?: string;
};

type Response = {
  play: () => void;
  pause: () => void;
  load: () => void;
  paused: boolean;
};

export const useAudio = (options?: Options): Response => {
  const audioElement = new Audio(options?.trackUrl ?? defaultTrack);

  const play = () => {
    audioElement.play();
  };

  const pause = () => {
    audioElement.pause();
  };
  const load = () => {
    audioElement.load();
  };

  return {
    play,
    pause,
    load,
    paused: audioElement.paused,
  };
};
