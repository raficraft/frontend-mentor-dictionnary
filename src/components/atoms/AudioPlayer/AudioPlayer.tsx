import { IconPlay } from "@/src/assets/svg/icons";
import styles from "./AudioPlayer.module.scss";
import { useState, useRef } from "react";

type AudioPlayerProps = {
  src: string | null;
};

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

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
      {src && (
        <audio
          ref={audioRef}
          src={src}
          onEnded={handleEnded}
          data-playing={playing}
        />
      )}
      <button
        onClick={togglePlay}
        type="button"
        className={styles.btn}
        {...(src ? {} : { disabled: true })}
      >
        {<IconPlay />}
      </button>
    </>
  );
};

export default AudioPlayer;
