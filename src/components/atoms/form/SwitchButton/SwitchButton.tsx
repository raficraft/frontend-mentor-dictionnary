import React, { ChangeEvent } from "react";
import { IconMoon } from "../../../../assets/svg/icons";
import styles from "./SwitchButton.module.scss";

type SwitchButtonProps = {
  callback: (e: ChangeEvent<HTMLInputElement>) => void;
} & React.HTMLAttributes<HTMLDivElement>;

const SwitchButton: React.FC<SwitchButtonProps> = ({ callback, ...props }) => {
  return (
    <div className={`${styles.switchButton}`} {...props}>
      <input
        className={styles.checkbox}
        id="switchTheme"
        name="switchTheme"
        type="checkbox"
        onChange={(e) => callback(e)}
      />
      <label htmlFor="switchTheme">{<IconMoon />}</label>
    </div>
  );
};

export default SwitchButton;
