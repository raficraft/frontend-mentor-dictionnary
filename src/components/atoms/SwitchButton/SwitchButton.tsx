import React, { ChangeEvent } from "react";
import styles from "./SwitchButton.module.scss";
// import { IconMoon } from "@/app/assets/svg/icons";
type SwitchButtonProps = {
  callback: (e: ChangeEvent<HTMLInputElement>) => void;
} & React.HTMLAttributes<HTMLDivElement>;

const SwitchButton: React.FC<SwitchButtonProps> = ({ callback, ...props }) => {
  console.log(styles);
  return (
    <div className={`${styles.switchButton}`} {...props}>
      <input
        className={styles.checkbox}
        id="switchTheme"
        name="switchTheme"
        type="checkbox"
        onChange={(e) => callback(e)}
      />
      <label htmlFor="switchTheme">{/* <IconMoon /> */}</label>
    </div>
  );
};

export default SwitchButton;
