import styles from "./TableDashItem.module.css";

import { ContextMenu, Favorite } from "../../../../../view/ui/index.js";
import useMenuContext from "../../../../../utils/useMenuContext.js";
import { File } from "../../../../../view/ui";
import { processString } from "../../../utils/sting.utils.js";
import { Fvorite, Popup } from "../../../../../view/ui";
import { formatBytes } from "../../../utils/byte.utils";
import { useSelector } from "react-redux";
import useFileServices from "../utils/useFileServices";
import { useState } from "react";

import {
  HiOutlineTrash as Trash,
  HiOutlineCloudDownload as Download,
  HiOutlineShare as Share,
} from "react-icons/hi";
import FileContextMenu from "../utils/fileContextMenu/fileContextMenu";
import { useTableContext } from "../utils/useTableContext";

const TableDashItem = ({ file }) => {
  const {
    handleFile,
    handleSelectFile,
    handleDelete,
    handleDownload,
    handleShare,
  } = useFileServices(file);
  const { isPremiumTable, isSharedTable } = useTableContext();

  const { show, btnRef, menuRef, handleBtnClick } = useMenuContext();

  const [coordinates, setCoordinates] = useState({ clientX: 0, clientY: 0 });

  const handleMoveTo = () => {
    handleFile();
  };

  const handleSelect = () => {
    handleSelectFile();
  };

  const toggleModal = () => {
    handleBtnClick();
  };

  const handleRightClick = (event) => {
    setCoordinates({ clientX: event.clientX, clientY: event.clientY });
    event.preventDefault();
    handleBtnClick();
    // Ваш код обробки кліку правою кнопкою миші
    // Наприклад, виведення повідомлення в консоль
    console.log(event);
  };

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
        className="z-50 fixed"
        style={{
          top: `${coordinates.clientY + 10}px`,
          left: `${coordinates.clientX + 10}px`,
        }}
      >
        <FileContextMenu menuRef={menuRef} show={show} buttons={buttons} />
      </div>
    </div>
  );
};

export default TableDashItem;
