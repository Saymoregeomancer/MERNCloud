import styles from "./Navigations.module.css";
import logo from "../../../assets/logo.png";

const NavigationsLayout = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.logoWrap}>
        <img src={logo} className={styles.logo} alt="logo"></img>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default NavigationsLayout;
