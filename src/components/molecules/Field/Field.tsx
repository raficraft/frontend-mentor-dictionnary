import React, { forwardRef, ReactNode, Ref, InputHTMLAttributes } from "react";
import styles from "./Field.module.scss";
import { Input, Text } from "@atoms/index";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  children?: ReactNode;
  reverse?: boolean;
  error?: string;
  svg?: ReactNode;
}

const Field = forwardRef(
  (
    { children, reverse, error, svg, ...rest }: FieldProps,
    ref: Ref<HTMLInputElement>
  ) => {
    return (
      <div className={styles.bloc}>
        <div className={styles.blocInput}>
          {!reverse && children ? children : null}
          <Input ref={ref} {...rest}></Input>
          {svg ? <span className={styles.icon}>{svg}</span> : null}
          {reverse && children ? children : null}
        </div>
        {error && <Text className={`text_warning text_s`}>{error}</Text>}
      </div>
    );
  }
);

Field.displayName = "Field";

export default Field;
