import styles from "./FavFilesItem.module.css";
import { File, Popup } from "../../../../view/ui";
import { formatBytes, processString } from "../../utils";

const FavFilesItem = ({ file }) => {
  return (
    <div className={styles.bodyItem}>
      <div className={styles.bodyItemHeader}>
        <File size={40} type={file.type} />
      </div>
      <div className={styles.bodyItemTitle}>
        <Popup description={file.name.length > 10 ? file.name : null}>
          {processString(file.name)}
        </Popup>
      </div>
      <div className={styles.bodyItemSubTitle}>
        <div>{file.size > 0 ? formatBytes(file.size) : null}</div>
      </div>
    </div>
  );
};

export default FavFilesItem;
