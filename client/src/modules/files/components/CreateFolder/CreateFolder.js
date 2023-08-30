import styles from "./CreateFolder.module.css";
import { HiOutlineFolderAdd as AddFolder } from "react-icons/hi";
import { ContextMenu } from "../../../../view/ui";
import useMenuContext from "../../../../utils/useMenuContext";
import CreateFolderForm from "./form/CreateFolderForm";

const CreateFolder = () => {
  const { show, btnRef, menuRef, handleBtnClick } = useMenuContext(false);

  const toggleModal = () => {
    handleBtnClick();
  };

  return (
    <>
      <div ref={btnRef} className={styles.icon} onClick={toggleModal}>
        <AddFolder size={70} />
      </div>
      <div ref={menuRef}>
        <ContextMenu isShow={show}>
          <CreateFolderForm onHide={toggleModal} />
        </ContextMenu>
      </div>
    </>
  );
};

export default CreateFolder;
