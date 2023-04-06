import { useEffect, useRef, useState } from "react";

export const useClickOutside = (
  init: boolean
): [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
  React.MutableRefObject<any>
] => {
  const refOutsideClick = useRef<HTMLElement>(null);
  const [show, setShow] = useState<boolean>(init);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      refOutsideClick.current &&
      !refOutsideClick.current.contains(event.target as Node)
    ) {
      setShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [refOutsideClick]);

  return [show, setShow, refOutsideClick];
};
