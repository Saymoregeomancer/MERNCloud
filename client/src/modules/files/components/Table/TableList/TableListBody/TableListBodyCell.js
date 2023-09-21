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
import { HiOutlineDotsVertical as Dots } from "react-icons/hi";
import { useTableContext } from "../../utils/useTableContext";
import { ContextMenu, ContextMenuBtn } from "../../../../../../view/ui";

const TableListBodyCell = ({ file }) => {
  const { isPremiumTable, isSharedTable } = useTableContext();

  const { handleFile, handleSelectFile, getMenuButtons } = useFileServices(
    file,
    isPremiumTable,
    isSharedTable
  );
  const { show, btnRef, menuRef, handleBtnClick } = useMenuContext(false);

  const toggleModal = () => {
    handleBtnClick();
  };
  const buttons = getMenuButtons(handleBtnClick);
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

      <div onClick={toggleModal} className={styles.actions}>
        <div ref={btnRef} className={styles.actionsIcons}>
          <Dots size={20} />
        </div>
      </div>
      <ContextMenu isShow={show} menuRef={menuRef}>
        {buttons &&
          buttons.map((btn) => {
            return <ContextMenuBtn key={btn.title} btnConfig={btn} />;
          })}
      </ContextMenu>
    </div>
  );
};

export default TableListBodyCell;
