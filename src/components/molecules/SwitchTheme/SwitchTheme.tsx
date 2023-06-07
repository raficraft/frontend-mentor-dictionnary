import React, { useEffect, useState, useRef } from "react";
import { SwitchButton } from "@/atoms/index";
import { IconMoon, IconSun } from "@/src/assets/svg/icons";
import styles from "./SwitchTheme.module.scss";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { useTheme } from "@/src/js/context/useTheme";

const SwitchTheme: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const sunRef = useRef(null);
  const moonRef = useRef(null);

  let checked = inputRef.current?.checked || false;
  const svgRef = checked ? moonRef : sunRef;

  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  return (
    <SwitchButton
      data-theme={theme}
      callback={(e) => {
        toggleTheme();
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
              {checked && (
                <IconMoon className={styles.moon} color="rgb(164, 69, 237)" />
              )}
              {!checked && <IconSun className={styles.sun} />}
            </span>
          </CSSTransition>
        </SwitchTransition>
      </label>
    </SwitchButton>
  );
};

export default SwitchTheme;
