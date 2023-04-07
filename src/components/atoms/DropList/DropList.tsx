import { useEffect, useState, useRef, createRef, RefObject } from "react";
import styles from "./DropList.module.scss";
import { useClickOutside } from "@/src/js/hooks/useClickOutside";
import { IconArrowDown } from "@/src/assets/svg/icons";

const config = ["Sans-serif", "Serif", "Mono"];

const Droplist = ({ options = config, tabIndex = 0 }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [show, setShow, refOutsideClick] = useClickOutside(false);

  // Dynamical Refs
  const optionsRefs = useRef<Array<RefObject<HTMLLIElement>>>(
    Object.keys(options).map(() => createRef())
  );

  const handleClose = (e: React.MouseEvent<HTMLSpanElement>, key: number) => {
    setSelectedIndex(key);
    setShow(!show);
    //  options[key].callback();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
    console.log(event.key);
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
            // options[selectedIndex].callback();
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
    <div className={styles.dropList} ref={refOutsideClick}>
      <span id="select-options-label" className="sr-only">
        Select an option for change the font-familly
      </span>
      <span
        className={styles.select}
        tabIndex={tabIndex}
        onClick={() => {
          setShow(!show);
        }}
        onKeyDown={handleKeyDown}
      >
        {options[selectedIndex]}
        <IconArrowDown />
      </span>
      {show && (
        <ul className={styles.optionsList} tabIndex={tabIndex}>
          {options.map((list, key) => {
            return (
              <li
                className={`
                  ${styles.option} 
                  ${key === selectedIndex ? styles.active : ""}
                `}
                key={`option-${key}`}
                data-open={show}
                tabIndex={tabIndex + key + 1}
                ref={optionsRefs.current[key]}
                onClick={(e) => handleClose(e, key)}
              >
                {list}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Droplist;
