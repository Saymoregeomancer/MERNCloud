import styles from "./TableListBodyCell.module.css";

import { useSelector, useDispatch } from "react-redux";
import ListCheck from "./ListCheck";
import ListType from "./ListType";
import ListName from "./ListName";
import ListBites from "./ListBites";
import ListMembers from "./ListMembers";
import ListAction from "./ListAction";
import ListFav from "./ListFav";
import useFileServices from "../../services/useFileServices";

const TableListBodyCell = ({ file }) => {
  const { currentDir } = useSelector((state) => state.files);
  const { handleFile, handleSelectFile, handleDelete, handleDownload } =
    useFileServices(file, currentDir);
  return (
    <div className={styles.cell}>
      <ListCheck />
      <ListType typeFunc={handleFile} fileType={file.type} />
      <ListName fileName={file.name} />
      <ListFav selectFunc={handleSelectFile} fileSelect={file.selected} />
      <ListBites fileSize={file.size} />
      <ListMembers />
      <ListAction
        onDeleteFunck={handleDelete}
        onDownloadFunc={handleDownload}
      />
    </div>
  );
};

export default TableListBodyCell;
