import styles from "./SideBar.module.css";

const SideBarLayout = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default SideBarLayout;
