import styles from "./DragAndDropProgress.module.css";

import { ProgresBar } from "../../../../../../view/ui";

const DragAndDropProgress = ({progresPercent}) => {
  return (
    <div className={styles.progresWrap}>
      <div className={styles.progresTitle}>Don`t reload page</div>
      <div className={styles.progresPercent}>{progresPercent}%</div>
      <div className={styles.progresBarWrap}>
        <ProgresBar percent={progresPercent} />
      </div>
    </div>
  );
};

export default DragAndDropProgress;
