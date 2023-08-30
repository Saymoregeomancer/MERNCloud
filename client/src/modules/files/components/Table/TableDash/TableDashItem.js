import styles from "./TableDashItem.module.css";

import { ContextMenu, Favorite } from "../../../../../view/ui/index.js";
import useMenuContext from "../../../../../utils/useMenuContext.js";
import { File } from "../../../../../view/ui";
import { processString } from "../../../utils/sting.utils.js";
import { Fvorite, Popup } from "../../../../../view/ui";
import { formatBytes } from "../../../utils/byte.utils";
import { useSelector } from "react-redux";
import useFileServices from "../services/useFileServices";
import { useState } from "react";

import {
  HiOutlineTrash as Trash,
  HiOutlineCloudDownload as Download,
} from "react-icons/hi";

const TableDashItem = ({ file }) => {
  const { currentDir } = useSelector((state) => state.files);
  const { handleFile, handleSelectFile, handleDelete, handleDownload } =
    useFileServices(file, currentDir);

  const { show, btnRef, menuRef, handleBtnClick } = useMenuContext();

  const [coordinates, setCoordinates] = useState({ clientX: 0, clientY: 0 });

  const handleMoveTo = () => {
    handleFile();
  };

  const handleSelect = () => {
    handleSelectFile();
  };

  const handleDownloadBtn = () => {
    handleDownload()
    handleBtnClick()
  }
  const handleDeleteBtn = () => {
    handleDelete()
    handleBtnClick()
  }



  const handleRightClick = (event) => {
    setCoordinates({ clientX: event.clientX, clientY: event.clientY });
    event.preventDefault();
    handleBtnClick();
    // Ваш код обробки кліку правою кнопкою миші
    // Наприклад, виведення повідомлення в консоль
    console.log(event);
  };

  return (
    <div ref={btnRef} onContextMenu={handleRightClick} className={styles.item}>
      <div onClick={handleMoveTo} className={styles.itemFile}>
        <File size={70} type={file.type} />
      </div>
      <div className={styles.itemName}>
        <Popup description={file.name.length > 10 ? file.name : null}>
          {processString(file.name)}
        </Popup>
      </div>
      <div className={styles.itemFav} onClick={handleSelect}>
        <Favorite size={20} isActive={file.selected} />
      </div>
      <div className={styles.descrItems}>
        <div className={file.size > 0 ? styles.descrItem : "hidden"}>
          {formatBytes(file.size)}
        </div>
        <div className={styles.descrItem}>Only you</div>
      </div>
      <div
        ref={menuRef}
        className={"z-50 fixed"}
        style={{
          top: `${coordinates.clientY + 10}px`,
          left: `${coordinates.clientX + 10}px`,
        }}
      >
        <ContextMenu isShow={show} menuStyle={"bottom-10"}>
          <div
             onClick={handleDownloadBtn}
            className={styles.menuItem}
          >
            <div className={styles.menuDownload}>
              <Download size={18} />
              <span className={styles.menuSpan}>Download</span>
            </div>
          </div>
          <div
            onClick={handleDeleteBtn}
            className={styles.menuItem}
          >
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

export default TableDashItem;
