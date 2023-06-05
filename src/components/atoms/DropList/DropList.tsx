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
  const [open, setOpen, refOutsideClick] = useClickOutside(false);

  // Dynamical Refs
  const optionsRefs = useRef<Array<RefObject<HTMLButtonElement>>>(
    options.map(() => createRef())
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    event.preventDefault();
    switch (event.key) {
      case "Enter":
        setOpen(!open);
        break;

      case "Escape":
        setOpen(false);
        break;

      case "ArrowUp":
      case "ArrowDown":
        !open && setOpen(true);
        break;
      case "Tab":
        if (open) {
          const index =
            selectedIndex + 1 >= options.length ? 0 : selectedIndex + 1;
          setSelectedIndex(index);
          callback && callback(options[index]);
        }

        break;

      default:
        if (open) {
          if (event.shiftKey && event.key === "Tab") {
            const index =
              selectedIndex + 1 < options.length
                ? options.length - 1
                : selectedIndex - 1;
            setSelectedIndex(index);
            callback && callback(options[index]);
          }
        }
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
          setOpen(!open);
        }}
        onKeyDown={handleKeyDown}
      >
        {options[selectedIndex]}
        <IconArrowDown />
      </button>

      <div className={styles.optionsList} data-open={open}>
        {options.map((option, key) => {
          return (
            <button
              className={`
                  ${styles.option} 
                  ${key === selectedIndex ? styles.active : ""}
                `}
              type="button"
              key={key}
              value={option}
              ref={optionsRefs.current[key]}
              onClick={() => {
                setSelectedIndex(key);
                setOpen(false);
                callback && callback(option);
              }}
              onKeyDown={() => {
                setSelectedIndex(key);
                setOpen(false);
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
