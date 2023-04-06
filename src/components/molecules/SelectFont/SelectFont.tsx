"use client";
import Select from "@/atoms/form/Select/Select";
import DropList from "../../atoms/form/DropList/DropList";

const SwitchFont = () => {
  const selectOptions = ["Sans Serif", "Serif", "Mono"];
  const changeFontfamilly = (font: string) => {
    document.body.style.setProperty("--font-family", font);
  };

  // const options = selectOptions.map((option) => {
  //   return {
  //     label: option,
  //     value: option === "Sans Serif" ? "sans-serif" : "monospace",
  //     onchange: () =>
  //       changeFontfamilly(option === "Sans Serif" ? "sans-serif" : "monospace"),
  //   };
  // });

  // return <Select options={options} />;

  const optionsGroup = selectOptions.map((option) => {
    return {
      label: option,
      value: option === "Sans Serif" ? "sans-serif" : "monospace",
       onchange: (value : string) =>{
        changeFontfamilly(value)
    }     
  });

  const selectedOptions = {    
    options: optionsGroup,
  };

  return <DropList options={selectedOptions.options} name="test" />;
};

export default SwitchFont;
