import { IconPlay } from "@/src/assets/svg/icons";
import styles from "./AudioPlayer.module.scss";
import { useState, useRef } from "react";
import { useTheme } from "@/src/js/context/useTheme";

type AudioPlayerProps = {
  src: string;
};

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const { theme, toggleTheme } = useTheme();

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

  return (
    <>
      <audio
        ref={audioRef}
        src={src}
        onEnded={handleEnded}
        data-playing={playing}
      />
      <button
        onClick={togglePlay}
        type="button"
        className={styles.btn}
        data-theme={theme}
      >
        {<IconPlay />}
      </button>
    </>
  );
};

export default AudioPlayer;
