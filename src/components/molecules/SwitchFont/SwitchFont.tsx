import { DropList } from "@/atoms/index";

const config = ["Sans-serif", "Serif", "Monospace"];

const changeFont = (font: string) => {
  const root = document.querySelector(":root");
  document.body.style.setProperty("--font-family", font);
};

const SwitchFont = () => {
  return (
    <DropList
      options={config}
      callback={(font) => {
        changeFont(font);
      }}
    />
  );
};

export default SwitchFont;
