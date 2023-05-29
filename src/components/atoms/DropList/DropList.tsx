import React, {
  useEffect,
  useState,
  useRef,
  createRef,
  RefObject,
} from "react";
import styles from "./DropList.module.scss";
import { useClickOutside } from "@/src/js/hooks/useClickOutside";
import { IconArrowDown } from "@/src/assets/svg/icons";

interface SVGProps {
  open: React.FC<React.SVGProps<SVGSVGElement>>;
  close: React.FC<React.SVGProps<SVGSVGElement>>;
  position: "left" | "right";
}

interface DropListProps {
  options: string[];
  callback?: (value: any) => void;
  tabIndex?: number;
  svg?: SVGProps;
}

const DropList: React.FC<DropListProps> = ({
  options = [],
  tabIndex = 1,
  callback,
}: DropListProps): JSX.Element => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [show, setShow, refOutsideClick] = useClickOutside(false);

  // Dynamical Refs
  const optionsRefs = useRef<Array<RefObject<HTMLButtonElement>>>(
    options.map(() => createRef())
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    event.preventDefault();
    switch (event.key) {
      case "Enter":
        setShow(!show);
        break;

      case "Escape":
        setShow(false);
        break;

      case "ArrowUp":
      case "ArrowDown":
        !show && setShow(true);
        break;
      case "Tab":
        // if (show) {
        //   console.log(optionsRefs);
        //   const firstElement = optionsRefs.current[0].current;
        //   firstElement ? firstElement.focus() : null;
        // }

        break;

      default:
        break;
    }
  };

  return (
    <div ref={refOutsideClick} className={styles.dropList}>
      <button
        className={styles.select}
        type="button"
        tabIndex={tabIndex}
        value={options[selectedIndex]}
        onClick={() => {
          setShow(!show);
        }}
        onKeyDown={handleKeyDown}
      >
        {options[selectedIndex]}
        <IconArrowDown />
      </button>

      <div className={styles.optionsList} data-show={show}>
        {options.map((option, key) => {
          return (
            <button
              className={`
                  ${styles.option} 
                  ${key === selectedIndex ? styles.active : ""}
                `}
              type="button"
              key={key}
              tabIndex={tabIndex + key + 1}
              value={option}
              ref={optionsRefs.current[key]}
              onClick={() => {
                setSelectedIndex(key);
                setShow(false);
                callback && callback(option);
              }}
              onKeyDown={() => {
                setSelectedIndex(key);
                setShow(false);
                callback && callback(option);
              }}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DropList;
