import styles from "./Menu.module.css";

const Menu = ({ left, right }) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        <div className={styles.left}>
          <div className={styles.leftItems}>{left}</div>
        </div>
        <div className={styles.right}>{right}</div>
      </div>
    </div>
  );
};

export default Menu;
