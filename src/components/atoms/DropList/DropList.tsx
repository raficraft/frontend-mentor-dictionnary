import React, { useEffect } from "react";
import styles from "./DropList.module.scss";
import { IconArrowDown } from "@assets/svg/icons";
import useDropList, { Option } from "@hooks/useDropList/UseDropList";

interface SVGProps {
  open: React.FC<React.SVGProps<SVGSVGElement>>;
  close: React.FC<React.SVGProps<SVGSVGElement>>;
  position: "left" | "right";
}

interface DropListProps extends React.HTMLProps<HTMLButtonElement> {
  options: Option[];
  callback?: (value: any) => void;
  svg?: SVGProps;
}

const DropList: React.FC<DropListProps> = ({
  options,
  callback,
}: DropListProps): JSX.Element | null => {
  const {
    selectedIndex,
    open,
    refOutsideClick,
    setOpen,
    handleKeyDown,
    handleOptionClick,
    optionsRefs,
  } = useDropList({ options, callback });

  useEffect(() => {
    if (options.length === 0) {
      console.warn("Aucune option n'a été fournie pour DropList.");
    }
  }, [options]);

  if (options.length === 0) {
    return null;
  }

  return (
    <div ref={refOutsideClick} className={styles.dropList}>
      <button
        className={styles.select}
        type='button'
        value={options[selectedIndex].value}
        onClick={() => {
          setOpen(!open);
        }}
        onKeyDown={handleKeyDown}
        data-testid='select-button'
        aria-haspopup='listbox'
        aria-expanded={open}
        aria-label='Select an option'
      >
        {options[selectedIndex].label}
        <IconArrowDown />
      </button>
      <div
        className={styles.optionsList}
        data-open={open}
        data-testid='options-list'
        role='listbox'
        aria-multiselectable={false}
      >
        {options.map((option, key) => {
          return (
            <button
              className={`
                ${styles.option} 
                ${key === selectedIndex ? styles.active : ""}
              `}
              type='button'
              key={key}
              value={option.value}
              ref={optionsRefs.current[key]}
              onClick={() => handleOptionClick(key, option)}
              data-testid={`option-button-${key}`}
              role='option'
              aria-selected={key === selectedIndex}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DropList;
