import styles from "./TableDash.module.css";
import TableDashItem from "./TableDashItem";
import { useSelector } from "react-redux";

const TableDash = ({}) => {
  const { files } = useSelector((state) => state.files);

  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        {files && files.map((file) => <TableDashItem key={file.name+file._id} file={file} />)}
      </div>
    </div>
  );
};

export default TableDash;
