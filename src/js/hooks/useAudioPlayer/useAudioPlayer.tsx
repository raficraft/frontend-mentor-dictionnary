import { useState, useRef, MutableRefObject } from "react";

type UseAudioPlayerResult = {
  playing: boolean;
  togglePlay: () => void;
  handleEnded: () => void;
  audioRef: MutableRefObject<HTMLAudioElement | null>;
};

const useAudioPlayer = (src: string | null): UseAudioPlayerResult => {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    const audio = audioRef.current;

    if (audio) {
      if (playing) {
        audio.pause();
      } else {
        audio.play();
      }
      setPlaying(!playing);
    }
  };

  const handleEnded = () => {
    setPlaying(false);
  };

  return {
    playing,
    togglePlay,
    handleEnded,
    audioRef,
  };
};

export default useAudioPlayer;
