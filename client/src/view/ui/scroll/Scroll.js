import styles from "./scroll.module.css";

const Scroll = ({ children, vertical = true }) => {
  const orientationStyle = vertical ? styles.vertical : styles.horizontal;
  return (
    <div className={`${styles.container} ${orientationStyle}`}>{children}</div>
  );
};

export default Scroll;
