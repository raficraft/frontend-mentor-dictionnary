import React from "react";
import styles from "./DropList.module.scss";
import { IconArrowDown } from "@assets/svg/icons";
import useDropList, { Option } from "@hooks/useDropList/UseDropList";

interface SVGProps {
  open: React.FC<React.SVGProps<SVGSVGElement>>;
  close: React.FC<React.SVGProps<SVGSVGElement>>;
  position: "left" | "right";
}

interface DropListProps {
  options: Option[];
  callback?: (value: any) => void;
  tabIndex?: number;
  svg?: SVGProps;
}

const DropList: React.FC<DropListProps> = ({
  options = [],
  tabIndex = 1,
  callback,
}: DropListProps): JSX.Element => {
  const {
    selectedIndex,
    open,
    refOutsideClick,
    setOpen,
    handleKeyDown,
    handleOptionClick,
    optionsRefs,
  } = useDropList({ options, callback });

  return (
    <div ref={refOutsideClick} className={styles.dropList}>
      <button
        className={styles.select}
        type="button"
        tabIndex={tabIndex}
        value={options[selectedIndex].value}
        onClick={() => {
          setOpen(!open);
        }}
        onKeyDown={handleKeyDown}
        data-testid="select-button"
      >
        {options[selectedIndex].label}
        <IconArrowDown />
      </button>
      <div
        className={styles.optionsList}
        data-open={open}
        data-testid="options-list"
      >
        {options.map((option, key) => {
          return (
            <button
              className={`
                  ${styles.option} 
                  ${key === selectedIndex ? styles.active : ""}
                `}
              type="button"
              key={key}
              value={option.value}
              ref={optionsRefs.current[key]}
              onClick={() => handleOptionClick(key, option)}
              onKeyDown={() => handleOptionClick(key, option)}
              data-testid={`option-button-${key}`}
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
