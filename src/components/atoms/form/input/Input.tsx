import { forwardRef, ForwardedRef, InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputRef?: ForwardedRef<HTMLInputElement>;
}

const Input = forwardRef(function Input(
  { inputRef, ...rest }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  return <input ref={inputRef} {...rest} className="input" />;
});

Input.displayName = "Input";

export default Input;
