import styles from "./TableListBodyCell.module.css";
import {
  HiOutlineDotsVertical as Dots,
  HiOutlineTrash as Trash,
  HiOutlineCloudDownload as Download,
} from "react-icons/hi";

import useMenuContext from "../../../../../../utils/useMenuContext";
import { ContextMenu } from "../../../../../../view/ui";
import { useDispatch } from "react-redux";

const ListAction = ({ onDownloadFunc , onDeleteFunck }) => {
  const dispatch = useDispatch();
  const { show, btnRef, menuRef, handleBtnClick } = useMenuContext(false);

  const toggleModal = () => {
    handleBtnClick();
  };
  const handleDownloadBtn = () => {
    onDownloadFunc()
    handleBtnClick();
  };

  const handleDeleteBtn = () => {
    onDeleteFunck()
    handleBtnClick();
  };

  return (
    <div className={styles.actions}>
      <div ref={btnRef} className={styles.actionsIcons} onClick={toggleModal}>
        <Dots size={20} />
      </div>

      <div ref={menuRef}>
        <ContextMenu isShow={show} menuStyle={styles.contextMenuStyle}>
          <div onClick={handleDownloadBtn} className={styles.menuItem}>
            <div className={styles.menuDownload}>
              <Download size={18} />
              <span className={styles.menuSpan}>Download</span>
            </div>
          </div>
          <div onClick={handleDeleteBtn} className={styles.menuItem}>
            <div className={styles.menuTrash}>
              <Trash size={18} />
              <span className={styles.menuSpan}>Delete</span>
            </div>
          </div>
        </ContextMenu>
      </div>
    </div>
  );
};

export default ListAction;
