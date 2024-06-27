import defaultTrack from "../assets/audio/default_track.mp3";
import { AUDIO_ID } from "../config/constants";

export const AudioController = () => {
  return <audio src={defaultTrack} id={AUDIO_ID} />;
};
