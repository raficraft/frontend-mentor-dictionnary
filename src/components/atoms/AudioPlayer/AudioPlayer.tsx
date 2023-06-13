import styles from "./AudioPlayer.module.scss";
import useAudioPlayer from "../../../hooks/useAudioPlayer/useAudioPlayer";
import { useTheme } from "@context/useTheme";
import { IconPlay, IconPause } from "@assets/svg/icons";

type AudioPlayerProps = {
  src: string | null;
};

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
  const { playing, pause, pauseAudio, playAudio, handleEnded, audioRef } =
    useAudioPlayer(src);
  const { theme } = useTheme();

  return (
    <>
      {src && (
        <audio
          ref={audioRef}
          src={src}
          onEnded={handleEnded}
          data-playing={playing}
          data-pause={pause}
          data-testid="audio"
        />
      )}
      <button
        onClick={!pause ? playAudio : pauseAudio}
        type="button"
        className={styles.btn}
        data-theme={theme}
        data-testid="audio-player-button"
      >
        {!pause && <IconPlay data-testid="icon-play" />}
        {pause && <IconPause data-testid="icon-pause" />}
      </button>
    </>
  );
};

export default AudioPlayer;
