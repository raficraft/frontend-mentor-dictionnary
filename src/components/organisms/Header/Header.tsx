import SwitchFont from "@/atoms/SwitchFont/SwitchFont";
import styles from "./Header.module.scss";

export const Header = () => {
  return (
    <header className={`rootContainer ${styles.header}`}>
      <SwitchFont />
      <p>Theme switcher</p>
    </header>
  );
};
