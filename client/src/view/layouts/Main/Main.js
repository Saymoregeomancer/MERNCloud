import styles from "./Main.module.css";

const MainLayout = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default MainLayout;
