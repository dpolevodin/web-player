import { forwardRef } from "react";
import defaultTrack from "../assets/audio/default_track.mp3";
import { AUDIO_ID } from "../config/constants";

type Props = { onDurationChange?: VoidFunction };

export const AudioController = forwardRef<HTMLAudioElement, Props>(
  function AudioController({ onDurationChange }, ref) {
    return (
      <audio
        src={defaultTrack}
        id={AUDIO_ID}
        ref={ref}
        onDurationChange={onDurationChange}
      />
    );
  }
);
