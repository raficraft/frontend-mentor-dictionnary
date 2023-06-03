import { forwardRef, ForwardedRef, InputHTMLAttributes } from "react";
import styles from "../Form.module.scss";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputRef?: ForwardedRef<HTMLInputElement>;
}

const Input = forwardRef(function Input(
  { inputRef, ...rest }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  return <input ref={inputRef} {...rest} className={styles.input} />;
});

Input.displayName = "Input";

export default Input;
