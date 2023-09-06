import { File } from "../../../../../../../../view/ui";
import styles from "./ListType.module.css";

const ListType = ({ onClick = null, fileType }) => {
  const handlerFileClick = () => {
    onClick();
  };

  return (
    <div onClick={handlerFileClick} className={styles.icon}>
      <File size={23} type={fileType} />
    </div>
  );
};

export default ListType;
