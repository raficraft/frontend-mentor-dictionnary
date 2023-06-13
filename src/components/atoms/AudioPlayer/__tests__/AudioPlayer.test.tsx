import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AudioPlayer from "../AudioPlayer";
import { useAudioPlayer } from "@hooks/index";

jest
  .spyOn(HTMLAudioElement.prototype, "play")
  .mockImplementation(() => Promise.resolve());
jest
  .spyOn(HTMLAudioElement.prototype, "pause")
  .mockImplementation(() => Promise.resolve());

describe("When the audioPlayer component is loaded with an audio source", () => {
  const customRender = () => {
    render(<AudioPlayer src="audio.mp3" />);

    const audioElement = screen.getByTestId("audio");
    const playButton = screen.getByTestId("audio-player-button");

    return { audioElement, playButton };
  };
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Should display the button and audio element when loaded with an audio source", () => {
    const { audioElement, playButton } = customRender();

    expect(audioElement).toBeInTheDocument();
    expect(playButton).toBeInTheDocument();
  });

  test("Should play the audio source when the play button is clicked", async () => {
    const { audioElement, playButton } = customRender();

    fireEvent.click(playButton);

    await waitFor(() => {
      expect(audioElement).toHaveAttribute("data-playing", "true");
      expect(screen.getByTestId("icon-pause")).toBeInTheDocument();
    });
  });

  test("Should pause the audio source when the pause button is clicked", async () => {
    const { audioElement, playButton } = customRender();

    fireEvent.click(playButton); // play

    await waitFor(() => {
      expect(audioElement).toHaveAttribute("data-playing", "true");
    });

    fireEvent.click(playButton); // Pause

    await waitFor(() => {
      expect(audioElement).toHaveAttribute("data-playing", "false");
      expect(audioElement).toHaveAttribute("data-pause", "true");
    });

    await waitFor(() => {
      expect(screen.getByTestId("icon-pause")).toBeInTheDocument();
    });
  });
});
