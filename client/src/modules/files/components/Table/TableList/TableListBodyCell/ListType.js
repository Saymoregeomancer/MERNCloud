import { File } from "../../../../../../view/ui";
import styles from "./TableListBodyCell.module.css";

const ListType = ({ typeFunc = null, fileType }) => {
  const handlerFileClick = () => {
    typeFunc();
  };

  return (
    <div onClick={handlerFileClick} className={styles.icon}>
      <File size={23} type={fileType} />
    </div>
  );
};

export default ListType;
