import Droplist from "@/atoms/DropList/DropList";

const config = ["Sans-serif", "Serif", "Mono"];

const changeFont = (font: string) => {
  alert(`change for this font ${font}`);
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
