import SwitchTheme from "@/atoms/SwitchTheme/SwitchTheme";
import styles from "./Header.module.scss";
import { IconDictionary } from "@/app/assets/svg/icons";
import SelectFont from "@/molecules/SelectFont/SelectFont";

export const Header = () => {
  return (
    <header className={`rootContainer ${styles.header}`}>
      <IconDictionary />
      <div className={styles.switch}>
        <SelectFont />
        <SwitchTheme />
      </div>
    </header>
  );
};
