import styles from "./Main.module.css";

const MainLayout = ({ children }) => {
  return <div id="MainLayout" className={styles.container}>{children}</div>;
};

export default MainLayout;
