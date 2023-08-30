import styles from "./ProgresBar.module.css";

const ProgresBar = ({ percent = 50 }) => {
  const progressBarStyle = {
    width: `${percent}%`,
    height: "20px",
    backgroundColor: "green",
  };

  return (
    // <div>
      <div className={styles.wrap}>
        <div className={styles.progress} style={{width:`${percent}%`}}></div>
      </div>
      // {/* <div>{`${percent}%`}</div> */}
    // </div>
  );
};

export default ProgresBar;
