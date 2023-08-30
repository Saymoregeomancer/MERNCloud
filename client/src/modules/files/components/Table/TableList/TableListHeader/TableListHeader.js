import styles from "./TableListHeader.module.css";

const TableHeader = ({}) => {
  return (
    <div className={styles.header}>
      <div className={styles.cell}>
        <div className={styles.check}></div>
        <div className={styles.icon}></div>
        <div className={styles.name}>Name</div>
        <div className={styles.favorite}></div>
        <div className={styles.size}>Size</div>
        <div className={styles.members}>Members</div>
        <div className={styles.actions}></div>
      </div>
    </div>
  );
};

export default TableHeader;
