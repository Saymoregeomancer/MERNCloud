import styles from "./Button.module.css";

const Button = ({ children, onClick, contained = false }) => {
  return (
    <div className={styles.container}>
      <div
        className={contained ? styles.contained : styles.outline}
        onClick={onClick}
      >
        {children}
      </div>
    </div>
  );
};

export default Button;
