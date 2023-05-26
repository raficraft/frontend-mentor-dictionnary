import React, { ReactNode, HTMLAttributes } from "react";

type TextProps = {
  tag: "h1" | "p" | "blockquote";
  children: ReactNode;
} & HTMLAttributes<HTMLElement>;

const Text = ({ tag, children, ...rest }: TextProps) => {
  const CustomTag = tag;

  return <CustomTag {...rest}>{children}</CustomTag>;
};

export default Text;
