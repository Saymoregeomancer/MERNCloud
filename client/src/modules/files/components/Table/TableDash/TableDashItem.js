import styles from "./TableDashItem.module.css";
import useMenuContext from "../../../../../utils/useMenuContext.js";
import { processString } from "../../../utils/sting.utils.js";
import {
  Popup,
  Favorite,
  File,
  ContextMenu,
  ContextMenuBtn,
} from "../../../../../view/ui";
import { formatBytes } from "../../../utils/byte.utils";
import useFileServices from "../utils/useFileServices";
import { useState, useMemo, useCallback } from "react";

import { useTableContext } from "../utils/useTableContext";

const TableDashItem = ({ file }) => {
  const { isPremiumTable, isSharedTable } = useTableContext();

  const { show, btnRef, menuRef, handleBtnClick } = useMenuContext();
  const { handleFile, handleSelectFile, getMenuButtons } = useFileServices(
    file,
    isPremiumTable,
    isSharedTable,
    handleBtnClick
  );

  const buttons = getMenuButtons(handleBtnClick);

  const handleRightClick = (event) => {
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

      <ContextMenu isShow={show} menuRef={menuRef}>
        {buttons &&
          buttons.map((btn) => {
            return <ContextMenuBtn key={btn.title} btnConfig={btn} />;
          })}
      </ContextMenu>
    </div>
  );
};

export default TableDashItem;
