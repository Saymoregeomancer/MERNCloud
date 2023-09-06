import styles from "./TableListBodyCell.module.css";
import {
  ListType,
  ListName,
  ListMembers,
  ListFav,
  ListCheck,
  ListBites,
} from "./parts";
import useFileServices from "../../utils/useFileServices";
import useMenuContext from "../../../../../../utils/useMenuContext";
import FileContextMenu from "../../utils/fileContextMenu/fileContextMenu";
import {
  HiOutlineDotsVertical as Dots,
  HiOutlineTrash as Trash,
  HiOutlineCloudDownload as Download,
  HiOutlineShare as Share,
} from "react-icons/hi";
import { useTableContext } from "../../utils/useTableContext";

const TableListBodyCell = ({ file }) => {
  const { isPremiumTable, isSharedTable } = useTableContext();
  const buttons = [
    {
      title: "Download",
      icon: Download,
      onClick: () => {
        handleDownload();
        toggleModal();
      },
    },
  ];

  if (isPremiumTable) {
    buttons.push({
      title: "Share",
      icon: Share,
      onClick: () => {
        handleShare();
        toggleModal();
      },
    });
  }

  if (!isSharedTable) {
    buttons.push({
      title: "Delete",
      icon: Trash,
      color: "red",
      onClick: () => {
        handleDelete();
        toggleModal();
      },
    });
  }

  const {
    handleFile,
    handleSelectFile,
    handleDelete,
    handleDownload,
    handleShare,
  } = useFileServices(file);
  const { show, btnRef, menuRef, handleBtnClick } = useMenuContext(false);

  const toggleModal = () => {
    handleBtnClick();
  };
  return (
    <div className={`${styles.cell} ${show ? styles.cellActive : ""}`}>
      <ListCheck />
      <ListType onClick={handleFile} fileType={file.type} />
      <ListName onClick={handleFile} fileName={file.name} />
      {!isSharedTable && (
        <ListFav onClick={handleSelectFile} fileSelect={file.selected} />
      )}
      <ListBites fileSize={file.size} />
      {!isSharedTable && <ListMembers />}
      <FileContextMenu menuRef={menuRef} show={show} buttons={buttons} />
      <div onClick={toggleModal} className={styles.actions}>
        <div ref={btnRef} className={styles.actionsIcons}>
          <Dots size={20} />
        </div>
      </div>
    </div>
  );
};

export default TableListBodyCell;
