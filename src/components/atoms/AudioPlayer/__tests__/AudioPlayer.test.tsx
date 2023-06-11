import { render, screen, fireEvent } from "@testing-library/react";
import AudioPlayer from "../AudioPlayer";

describe("AudioPlayer", () => {
  test("renders the audio player with the play button", () => {
    render(<AudioPlayer src="audio.mp3" />);
    const audioElement = screen.getByRole("audio");
    const playButton = screen.getByRole("button");

    expect(audioElement).toBeInTheDocument();
    expect(playButton).toBeInTheDocument();
  });

  test("disables the play button when no audio source is provided", () => {
    render(<AudioPlayer src={null} />);
    const playButton = screen.getByRole("button");

    expect(playButton).toBeDisabled();
  });

  test("toggles the play state when the play button is clicked", () => {
    render(<AudioPlayer src="audio.mp3" />);
    const playButton = screen.getByRole("button");

    fireEvent.click(playButton);
    expect(playButton).toHaveAttribute("data-playing", "true");

    fireEvent.click(playButton);
    expect(playButton).toHaveAttribute("data-playing", "false");
  });

  // Add more tests as needed
});
