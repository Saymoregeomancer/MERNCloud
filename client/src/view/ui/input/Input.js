import styles from "./Input.module.css";

const Input = ({ error,...rest }) => {
  return (
    <input
      className={`${styles.input} ${error ? styles.error : null}`}
      {...rest}
    ></input>
  );
};

export default Input;
