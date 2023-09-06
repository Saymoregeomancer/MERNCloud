import { formatBytes } from "../../../../../../utils";
import styles from "./ListBites.module.css";

const ListBites = ({ fileSize }) => {
  return (
    <div className={fileSize === 0 ? styles.nonesize : styles.size}>
      {formatBytes(fileSize)}
    </div>
  );
};

export default ListBites;
