import styles from "./TableListBody.module.css";
import { useSelector } from "react-redux";
import TableListBodyCell from "./TableListBodyCell";
import { FiSearch } from "react-icons/fi";
import { Skeleton } from "../../../../../../view/ui";
const TableBody = ({}) => {
  const { files } = useSelector((state) => state.files);

  return (
    <div className={styles.body}>
      {files.length > 0 ? (
        files.map((file, index) => (
          <TableListBodyCell key={file.date + index} file={file} />
        ))
      ) : (
        <div className={styles.notFoundContainer}>
          <div className={styles.notFoundWrapTitle}>
            Files are missing...
            <FiSearch size={50} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TableBody;
