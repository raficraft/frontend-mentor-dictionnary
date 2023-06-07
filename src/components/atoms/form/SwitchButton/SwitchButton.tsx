import React, { ChangeEvent, FC, HTMLAttributes, Ref } from "react";
import internalStyles from "./SwitchButton.module.scss";

type SwitchButtonProps = {
  callback: (e: ChangeEvent<HTMLInputElement>) => void;
  children?: string | React.ReactElement | SVGElement;
  externalStyles?: any;
  inputRef?: Ref<HTMLInputElement>;
} & HTMLAttributes<HTMLInputElement>;

const SwitchButton: FC<SwitchButtonProps> = ({
  callback,
  externalStyles,
  children,
  inputRef,
  ...props
}) => {
  const styles = externalStyles || internalStyles;

  return (
    <div className={`${styles.switchButton}`}>
      <input
        className={styles.checkbox}
        id="switchTheme"
        name="switchTheme"
        type="checkbox"
        tabIndex={2}
        onChange={(e) => callback(e)}
        ref={inputRef}
        {...props}
      />
      {children}
    </div>
  );
};

export default SwitchButton;
