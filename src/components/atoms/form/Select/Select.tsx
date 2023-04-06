"use client";
import { useEffect, useState, useRef, createRef } from "react";
import styles from "./Select.module.scss";
import { useClickOutside } from "@/app/js/hooks/useClickOutside";
import { IconArrowDown } from "@/app/assets/svg/icons";

type SelectType = {
  options: {
    label: string;
    value: string;
    callback: () => void;
  }[];
  tabIndex?: number;
} & React.SelectHTMLAttributes<HTMLSelectElement> &
  React.OptionHTMLAttributes<HTMLOptionElement>;

const Select: React.FC<SelectType> = ({ options, tabIndex = 0 }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [show, setShow, refOutsideClick] = useClickOutside(false);
  // Dynamical Refs
  const optionsRefs = useRef<Array<React.RefObject<HTMLSpanElement>>>(
    Object.keys(options).map(() => createRef())
  );

  const handleClose = (e: React.MouseEvent<HTMLSpanElement>, key: number) => {
    setSelectedIndex(key);
    setShow(!show);
    options[key].callback();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
    switch (event.key) {
      case "Enter":
        !show && setShow(true);
        break;
      case "Escape":
        setShow(false);
        break;
      case "ArrowUp":
      case "ArrowDown":
        !show && setShow(true);
        break;
      case "Tab":
        if (show) {
          event.preventDefault();
          const firstElement = optionsRefs.current[0].current;
          firstElement ? firstElement.focus() : null;
        }
    }
  };

  useEffect(() => {
    if (show) {
      const optionsRefCurrent = optionsRefs.current;
      const handleCurrentOptions = (
        event: React.KeyboardEvent<HTMLSpanElement>
      ) => {
        event.preventDefault();

        const end = Object.keys(options).length - 1;
        switch (event.key) {
          case "ArrowUp":
            setSelectedIndex((prevIndex) =>
              prevIndex - 1 < 0 ? end : prevIndex - 1
            );
            break;
          case "ArrowDown":
            setSelectedIndex((prevIndex) =>
              prevIndex + 1 > end ? 0 : prevIndex + 1
            );
            break;
          case "Tab":
            if (event.shiftKey) {
              // Shift key is pressed, decrement index
              if (selectedIndex - 1 >= 0) {
                setSelectedIndex(selectedIndex - 1);
                const element = optionsRefs.current[selectedIndex - 1].current;
                element ? element.focus() : null;
              } else if (selectedIndex - 1 < 0) {
                setSelectedIndex(end);
                const element = optionsRefs.current[end].current;
                element ? element.focus() : null;
              }
            } else {
              // Shift key is not pressed, increment index
              if (selectedIndex >= 0 && selectedIndex < end) {
                setSelectedIndex(selectedIndex + 1);
                const element = optionsRefs.current[selectedIndex + 1].current;
                element ? element.focus() : null;
              } else if (selectedIndex + 1 > end) {
                setSelectedIndex(0);
                const element = optionsRefs.current[0].current;
                element ? element.focus() : null;
              }
            }
            break;
          case "Enter":
          case "Space":
            const currentRef = optionsRefs.current.find(
              (ref, index) => index === selectedIndex
            );
            const currentElement = currentRef?.current;
            currentElement?.blur();
            options[selectedIndex].callback();
            setShow(false);
            break;
        }
      };

      document.addEventListener("keydown", handleCurrentOptions);
      return () => {
        document.removeEventListener("keydown", handleCurrentOptions);

        const currentRef = optionsRefCurrent.find(
          (ref, index) => index === selectedIndex
        );
        const currentElement = currentRef?.current;
        currentElement?.blur();
      };
    }
  }, [show, selectedIndex, Object.keys(options).length, optionsRefs]);

  return (
    <div className={styles.dropList} ref={refOutsideClick} aria-expanded={show}>
      <span
        aria-haspopup="listbox"
        aria-controls="select-options"
        aria-selected={show ? "true" : "false"}
        aria-label={`Selected option: ${options[selectedIndex]}`}
        className={styles.select}
        tabIndex={tabIndex}
        onClick={() => {
          setShow(!show);
        }}
        onKeyDown={handleKeyDown}
      >
        {options[selectedIndex].label}
        <IconArrowDown />
      </span>

      {show && (
        <span
          id="select-options"
          role="listbox"
          aria-labelledby="select-options-label"
          className={styles.optionsList}
        >
          <span id="select-options-label" className="sr-only">
            Select an option for change the font-familly
          </span>
          {options.map((option, key) => {
            return (
              <span
                className={`
                  ${styles.option} 
                  ${key === selectedIndex ? styles.active : ""}
                `}
                aria-selected={selectedIndex === key ? "true" : "false"}
                tabIndex={tabIndex + key + 1}
                key={`option-${key}`}
                onClick={(e) => handleClose(e, key)}
                ref={optionsRefs.current[key]}
                value={option.value}
              >
                {option.label}
              </span>
            );
          })}
        </span>
      )}
    </div>
  );
};

export default Select;
