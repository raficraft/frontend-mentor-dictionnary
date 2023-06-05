import { IconDictionary } from "@/src/assets/svg/icons";
import styles from "./Header.module.scss";
import SwitchTheme from "@/molecules/SwitchTheme/SwitchTheme";
import SwitchFont from "@/molecules/SwitchFont/SwitchFont";

const Header = () => {
  return (
    <header className={`rootContainer ${styles.header}`}>
      <IconDictionary />
      <div className={`${styles.switch}`}>
        <SwitchFont />
        <SwitchTheme />
      </div>
    </header>
  );
};

export default Header;
