import React, { useEffect, useState, useRef } from "react";
import SwitchButton from "@/src/components/atoms/form/SwitchButton/SwitchButton";
import { IconMoon, IconSun } from "@/src/assets/svg/icons";
import styles from "./SwitchTheme.module.scss";
import { SwitchTransition, CSSTransition } from "react-transition-group";

const SwitchTheme: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const inputRef = useRef<HTMLInputElement>(null);
  let checked = inputRef.current?.checked || false;
  const sunRef = useRef(null);
  const moonRef = useRef(null);
  const svgRef = checked ? moonRef : sunRef;

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
      externalStyles={styles}
      inputRef={inputRef}
    >
      <label htmlFor="switchTheme" className={styles.label}>
        <SwitchTransition>
          <CSSTransition
            classNames={styles}
            nodeRef={svgRef}
            timeout={300}
            key={checked ? "moon" : "sun"}
          >
            <span ref={svgRef}>
              {checked && <IconMoon className={styles.moon} />}
              {!checked && <IconSun className={styles.sun} />}
            </span>
          </CSSTransition>
        </SwitchTransition>
      </label>
    </SwitchButton>
  );
};

export default SwitchTheme;
