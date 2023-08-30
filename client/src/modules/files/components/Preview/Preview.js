import React, { useEffect, useState } from "react";
import styles from "./Preview.module.css";
import { File, Loader, Modal } from "../../../../view/ui";
import { useSelector, useDispatch } from "react-redux";
import { fetchPreview } from "../../";
import { FiMaximize2 } from "react-icons/fi";
import DescrPreview from "./parts/descrPreview/DescrPreview";
import SwitcherPreview from "./parts/switcherPreview/SwitcherPreview";
import conf from "./successTypes.json";

const Preview = () => {
  const { previewFile, previewType } = useSelector((state) => state.preview);

  const isLoading = useSelector((state) => state.preview.isLoading);
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);

  const handleFullScreen = () => {
    setModal(true);
    dispatch(fetchPreview({ file: previewFile, resize: false }));
  };
  const handleCloseFullScreen = () => {
    setModal(false);
  };
  const renderLoader = () => (
    <div className={styles.loading}>
      <Loader reverse />
    </div>
  );
  return (
    <div className={styles.container}>
      {isLoading ? renderLoader() : <SwitcherPreview />}
      <DescrPreview />
      {!!previewType &&
        conf.typesFullScreen.includes(previewType?.split("/")[0]) && (
          <div onClick={handleFullScreen} className={styles.resize}>
            <FiMaximize2 size={20} />
          </div>
        )}
      <Modal showModal={modal} onClose={handleCloseFullScreen}>
        {isLoading ? (
          <div className="flex flex-col">
            {renderLoader()}
            <span>We are restoring the original file size, please wait</span>
          </div>
        ) : (
          <SwitcherPreview fullScreen />
        )}
      </Modal>
    </div>
  );
};

export default Preview;
