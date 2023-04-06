"use client";

import { useLayoutEffect, useState } from "react";
import styles from "./SwitchTheme.module.scss";
import { IconMoon } from "@/app/assets/svg/icons";

const SwitchTheme = (): JSX.Element => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const handleTheme = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const themes = e.target.checked ? "light" : "dark";
    setTheme(themes);
  };

  useLayoutEffect(() => {
    setTheme(
      window.matchMedia("(prefers-color-scheme: dark)") ? "dark" : "light"
    );
  }, []);

  useLayoutEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  return (
    <div className={`${styles.switchTheme} ${styles[theme]}`}>
      <input
        className={styles.checkbox}
        id="switchTheme"
        name="switchTheme"
        type="checkbox"
        onChange={(e) => {
          handleTheme(e);
        }}
      />
      <label htmlFor="switchTheme">
        <IconMoon />
      </label>
    </div>
  );
};

export default SwitchTheme;
