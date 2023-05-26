import Droplist from "@/atoms/DropList/DropList";

const config = ["Sans-serif", "Serif", "Monospace"];

const changeFont = (font: string) => {
  const root = document.querySelector(":root");
  document.body.style.setProperty("--font-family", font);
};

const SwitchFont = () => {
  return (
    <Droplist
      options={config}
      callback={(font) => {
        changeFont(font);
      }}
    />
  );
};

export default SwitchFont;
