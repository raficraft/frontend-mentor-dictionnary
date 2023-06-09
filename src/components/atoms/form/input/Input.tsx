import { forwardRef, ForwardedRef, InputHTMLAttributes } from "react";

const Input = forwardRef(function Input(
  { ...props },
  ref: ForwardedRef<HTMLInputElement>
) {
  return <input ref={ref} {...props} />;
});

Input.displayName = "Input";

export default Input;
