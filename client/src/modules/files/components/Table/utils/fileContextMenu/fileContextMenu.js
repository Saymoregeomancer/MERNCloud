import styles from "./FileContextMenu.module.css";
import { ContextMenu, ContextMenuBtn } from "../../../../../../view/ui";
import React from "react";
const FileContextMenu = ({ menuRef, show, buttons }) => {
  return (
    <div ref={menuRef}>
      <ContextMenu isShow={show} menuStyle={styles.contextMenuStyle}>
        {buttons &&
          buttons.map((btn) => {
            return (
              <React.Fragment key={btn.title}>
                <ContextMenuBtn btnConfig={btn} />
              </React.Fragment>
            );
          })}
      </ContextMenu>
    </div>
  );
};

export default FileContextMenu;
