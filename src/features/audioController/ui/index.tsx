import { forwardRef, type ChangeEvent } from "react";
import defaultTrack from "../assets/audio/default_track.mp3";
import { AUDIO_ID } from "../config/constants";

type Props = {
  onDurationChange?: VoidFunction;
  onLoadedMetadata?: VoidFunction;
  onTimeUpdate?: (event: ChangeEvent<HTMLAudioElement>) => void;
  onEnded?: VoidFunction;
  src?: string;
};

export const AudioController = forwardRef<HTMLAudioElement, Props>(
  function AudioController(
    { onDurationChange, onLoadedMetadata, onTimeUpdate, onEnded, src },
    ref
  ) {
    return (
      <audio
        src={src}
        id={AUDIO_ID}
        ref={ref}
        onDurationChange={onDurationChange}
        onLoadedMetadata={onLoadedMetadata}
        onTimeUpdate={onTimeUpdate}
        onEnded={onEnded}
      >
        <source src={src} />
      </audio>
    );
  }
);
