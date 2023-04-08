import React, { useEffect, useState } from "react";
import SwitchButton from "@/src/components/atoms/form/SwitchButton/SwitchButton";

const SwitchTheme: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const handleTheme = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const themes = e.target.checked ? "dark" : "light";
    setTheme(themes);
  };

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  return (
    <SwitchButton
      data-theme={theme}
      callback={(e) => {
        handleTheme(e);
      }}
    />
  );
};

export default SwitchTheme;
