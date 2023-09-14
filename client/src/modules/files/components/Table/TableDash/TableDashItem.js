import styles from "./TableDashItem.module.css";
import useMenuContext from "../../../../../utils/useMenuContext.js";
import { processString } from "../../../utils/sting.utils.js";
import { Popup, Favorite, File } from "../../../../../view/ui";
import { formatBytes } from "../../../utils/byte.utils";
import useFileServices from "../utils/useFileServices";
import { useState, useMemo } from "react";

import FileContextMenu from "../utils/fileContextMenu/fileContextMenu";
import { useTableContext } from "../utils/useTableContext";

const TableDashItem = ({ file }) => {
  const { isPremiumTable, isSharedTable } = useTableContext();

  const { handleFile, handleSelectFile, getMenuButtons } = useFileServices(
    file,
    isPremiumTable,
    isSharedTable
  );
  const { show, btnRef, menuRef, handleBtnClick } = useMenuContext();

  const [coordinates, setCoordinates] = useState({ clientX: 0, clientY: 0 });

  const toggleModal = () => {
    handleBtnClick();
  };

  const buttons = useMemo(() => {
    return getMenuButtons(toggleModal);
  }, [isPremiumTable, isSharedTable]);

  const handleRightClick = (event) => {
    setCoordinates({ clientX: event.clientX, clientY: event.clientY });
    event.preventDefault();
    handleBtnClick();
  };

  return (
    <div ref={btnRef} onContextMenu={handleRightClick} className={styles.item}>
      <div onClick={handleFile} className={styles.itemFile}>
        <File size={70} type={file.type} />
      </div>
      <div className={styles.itemName}>
        <Popup description={file.name.length > 10 ? file.name : null}>
          {processString(file.name)}
        </Popup>
      </div>
      <div className={styles.itemFav} onClick={handleSelectFile}>
        {!isSharedTable && <Favorite size={20} isActive={file.selected} />}
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
