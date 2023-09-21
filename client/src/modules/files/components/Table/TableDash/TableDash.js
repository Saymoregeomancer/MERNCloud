import styles from "./TableDash.module.css";
import TableDashItem from "./TableDashItem";
import { FiSearch } from "react-icons/fi";
import { useSelector } from "react-redux";
const TableDash = ({}) => {
  const { files } = useSelector((state) => state.files);

  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        {files.length > 0 ? (
          files.map((file) => (
            <TableDashItem key={file.name + file._id} file={file} />
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
    </div>
  );
};

export default TableDash;
