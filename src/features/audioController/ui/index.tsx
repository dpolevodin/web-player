import defaultTrack from "../assets/audio/default_track.mp3";
import { AUDIO_ID } from "../config/constants";

export const AudioController = () => {
  const audioElement = new Audio(defaultTrack);

  return <audio src={defaultTrack} id={AUDIO_ID} />;
};
