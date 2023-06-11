import React, { useState, useRef, createRef, RefObject } from "react";
import styles from "./DropList.module.scss";
import { useClickOutside } from "@/hooks/index";

interface UseDropListProps {
  options: string[];
  callback?: (value: any) => void;
}

interface UseDropListResult {
  selectedIndex: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  refOutsideClick: React.RefObject<HTMLDivElement>;
  handleKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  handleOptionClick: (index: number, option: string) => void;
  optionsRefs: React.MutableRefObject<RefObject<HTMLButtonElement>[]>;
}

function useDropList({
  options,
  callback,
}: UseDropListProps): UseDropListResult {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [open, setOpen, refOutsideClick] = useClickOutside(false);

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

  const handleOptionClick = (index: number, option: string) => {
    setSelectedIndex(index);
    setOpen(false);
    callback && callback(option);
  };

  return {
    selectedIndex,
    open,
    refOutsideClick,
    setOpen,
    handleKeyDown,
    handleOptionClick,
    optionsRefs,
  };
}
export default useDropList;
