import { ContextMenu, ContextMenuBtn } from "../../../../../view/ui";

const FileContextMenu = ({ isShow, menuRef, buttons }) => {
  return (
    isShow && (
      <ContextMenu isShow={isShow} menuRef={menuRef}>
        {buttons &&
          buttons.map((btn) => {
            return <ContextMenuBtn key={btn.title} btnConfig={btn} />;
          })}
      </ContextMenu>
    )
  );
};

export default FileContextMenu;
