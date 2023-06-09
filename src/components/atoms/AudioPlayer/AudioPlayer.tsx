import { IconPlay } from "@/src/assets/svg/icons";
import styles from "./AudioPlayer.module.scss";
import { useAudioPlayer } from "@/hooks/index";
import { useTheme } from "@/src/js/context/useTheme";

type AudioPlayerProps = {
  src: string | null;
};

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
  const { playing, togglePlay, handleEnded, audioRef } = useAudioPlayer(src);
  const { theme } = useTheme();

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
        data-theme={theme}
        {...(src ? { disabled: playing } : { disabled: true })}
      >
        {<IconPlay />}
      </button>
    </>
  );
};

export default AudioPlayer;
