import React, { ChangeEvent, FC, HTMLAttributes, Ref } from "react";
import internalStyles from "./SwitchButton.module.scss";

type SwitchButtonProps = {
  callback: (e: ChangeEvent<HTMLInputElement>) => void;
  children?: string | React.ReactElement | SVGElement;
  externalStyles?: any;
  inputRef?: Ref<HTMLInputElement>;
} & HTMLAttributes<HTMLDivElement>;

const SwitchButton: FC<SwitchButtonProps> = ({
  callback,
  externalStyles,
  children,
  inputRef,
  ...props
}) => {
  const styles = externalStyles || internalStyles;

  return (
    <div className={`${styles.switchButton}`} {...props}>
      <input
        className={styles.checkbox}
        id="switchTheme"
        name="switchTheme"
        type="checkbox"
        onChange={(e) => callback(e)}
        ref={inputRef}
      />
      {children}
    </div>
  );
};

export default SwitchButton;
