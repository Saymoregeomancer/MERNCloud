import styles from "./TableListHeader.module.css";
import { useTableContext } from "../../utils/useTableContext";
const TableHeader = ({}) => {
  const { isPremiumTable, isSharedTable } = useTableContext();
  return (
    <div className={styles.header}>
      <div className={styles.cell}>
        <div className={styles.check}></div>
        <div className={styles.icon}></div>
        <div className={styles.name}>Name</div>
        {!isSharedTable && <div className={styles.favorite}></div>}
        <div className={styles.size}>Size</div>
        {!isSharedTable && <div className={styles.members}>Members</div>}
        <div className={styles.actions}></div>
      </div>
    </div>
  );
};

export default TableHeader;
