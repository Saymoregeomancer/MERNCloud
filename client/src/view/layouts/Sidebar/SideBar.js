import styles from "./SideBar.module.css";

const SideBarLayout = ({ children }) => {
  return <div id="SideBarLayout" className={styles.container}>{children}</div>;
};

export default SideBarLayout;
