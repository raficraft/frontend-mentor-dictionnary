import { forwardRef, ForwardedRef, InputHTMLAttributes } from "react";
import styles from "../Form.module.scss";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  inputRef?: ForwardedRef<HTMLInputElement>;
}

const Input = forwardRef(function Input(
  { inputRef, ...rest }: Props,
  ref: ForwardedRef<HTMLInputElement>
) {
  return <input ref={inputRef} {...rest} className={styles.input} />;
});

export default Input;
