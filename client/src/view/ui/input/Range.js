import styles from "./Range.module.css";

const Range = ({ value, min, max, onChange }) => {
  const normalizedValue = ((value - min) / (max - min)) * 100;

  let progresWidth = {
    width: `${normalizedValue + (normalizedValue > 50 ? 0.8 : 2.2)}%`,
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftrack} style={progresWidth} />
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        onChange={(e) => onChange(e)}
        className={styles.input}
      />
    </div>
  );
};

export default Range;
