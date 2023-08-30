import styles from "./DescrPreview.module.css";
import { formatBytes } from "../../../../utils/byte.utils";
import { getDateInfo } from "../../../../utils/date.utils";
import { processString } from "../../../../utils/sting.utils";
import { Popup } from "../../../../../../view/ui";

import { useSelector } from "react-redux";

const DescrPreview = () => {
  const { previewFile } = useSelector((state) => state.preview);
  return (
    <div className={styles.descr}>
      <div className={styles.descrItem}>
        <div className={styles.title}>Name:</div>
        <div className={styles.subtitle}>
          <Popup description={previewFile?.name}>
            {processString(previewFile?.name ?? "--")}
          </Popup>
        </div>
      </div>
      <div className={styles.descrItem}>
        <div className={styles.title}>Size:</div>
        <div className={styles.subtitle}>
          {formatBytes(previewFile?.size ?? 0)}
        </div>
      </div>
      <div className={styles.descrItem}>
        <div className={styles.title}>Date:</div>
        <div className={styles.subtitle}>
          {previewFile?.date ? getDateInfo(previewFile?.date) : "--"}
        </div>
      </div>
    </div>
  );
};

export default DescrPreview;
