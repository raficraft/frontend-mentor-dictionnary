import Droplist from "../../atoms/DropList/DropList";
import styles from "./Header.module.scss";

export const Header = () => {
  return (
    <header className={`rootContainer ${styles.header}`}>
      <Droplist />
      <p>Theme switcher</p>
    </header>
  );
};
