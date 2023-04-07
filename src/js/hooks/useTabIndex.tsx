import { useEffect, useRef, useState } from "react";

export const useTabIndex = (
  init: boolean
): [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
  React.MutableRefObject<any>
] => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {}, []);

  return [];
};
