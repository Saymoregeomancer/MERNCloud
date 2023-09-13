import styles from "./TableListBody.module.css";
import { useSelector } from "react-redux";
import TableListBodyCell from "./TableListBodyCell";

const TableBody = ({}) => {
  const { files } = useSelector((state) => state.files);

    console.log('render')
  return (
    <div className={styles.body}>
      {files.map((file, index) => (
        <TableListBodyCell key={file.date + index} file={file} />
      ))}
    </div>
  );
};

export default TableBody;
