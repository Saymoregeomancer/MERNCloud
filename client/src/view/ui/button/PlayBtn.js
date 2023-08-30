import styles from "./PlayBtn.module.css";

const PlayBtn = ({ onClick, isPlaying }) => {
  return (
    <div className={styles.container}>
      <div className={isPlaying ? styles.btnAnimate : null}>
        <div onClick={() => onClick()} className={styles.btn}>
          <div className={`${styles.wrap} ${isPlaying ? styles.active : null}`}>
            <div className={styles.span}></div>
            <div className={styles.span}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayBtn;
