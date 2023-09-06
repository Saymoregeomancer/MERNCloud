import styles from "./ContextMenuBtn.module.css";

const ContextMenuBtn = ({ btnConfig }) => {
  const { title, icon, color, onClick } = btnConfig;
  const styleColor = styles[`${color}`];
  const Icon = icon;
  return (
    <div onClick={() => onClick()} className={styles.menuItem}>
      <div className={`${styles.btn} ${styleColor}`}>
        {Icon && <Icon size={18} />}
        <span className={styles.menuSpan}>{title}</span>
      </div>
    </div>
  );
};

export default ContextMenuBtn;
