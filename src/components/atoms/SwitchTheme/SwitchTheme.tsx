import React, { useEffect, useState } from "react";
import SwitchButton from "../SwitchButton/SwitchButton";

const SwitchTheme: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const handleTheme = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(e.target.checked);
    const themes = e.target.checked ? "dark" : "light";
    setTheme(themes);
  };

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  return (
    <SwitchButton
      id="lol"
      data-theme={theme}
      callback={(e) => {
        handleTheme(e);
      }}
    />
  );
};

export default SwitchTheme;
