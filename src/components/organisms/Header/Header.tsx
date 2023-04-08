import SwitchFont from "@/atoms/SwitchFont/SwitchFont";
import styles from "./Header.module.scss";
import SwitchButton from "@/atoms/SwitchButton/SwitchButton";
import SwitchTheme from "@/atoms/SwitchTheme/SwitchTheme";

export const Header = () => {
  return (
    <header className={`rootContainer ${styles.header}`}>
      <SwitchFont />
      <SwitchTheme />
    </header>
  );
};
