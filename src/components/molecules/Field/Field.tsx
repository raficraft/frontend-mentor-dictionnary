import React, {
  forwardRef,
  useEffect,
  useState,
  useRef,
  ReactNode,
  Ref,
  InputHTMLAttributes,
} from "react";
import style from "./Field.module.scss";
import Input from "../../atoms/form/input/Input";
import Error from "../../atoms/form/Error/Error";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  children?: ReactNode;
  reverse?: boolean;
  errorMessage?: string;
  svg?: ReactNode;
}

const Field = forwardRef(
  (
    { children, reverse, errorMessage, svg, ...rest }: FieldProps,
    ref: Ref<HTMLInputElement>
  ) => {
    return (
      <div>
        <div>
          {!reverse && children ? children : null}
          <Input ref={ref} {...rest}></Input>
          {svg ? <span>{svg}</span> : null}
          {reverse && children ? children : null}
        </div>
        {errorMessage ? <Error errorMessage={errorMessage} /> : null}
      </div>
    );
  }
);

Field.displayName = "Field";

export default Field;
