import styles from "./FavFilesList.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchFiles } from "../../store/actions/fileActions";
import { Scroll } from "../../../../view/ui";
import FavFilesItem from "./FavFilesItem";

const FavFilesList = ({}) => {
  const [hide, setIsHide] = useState(false);

  const dispatch = useDispatch();
  const handleSearchAllFiles = () => {
    dispatch(searchFiles(true));
    setIsHide(false);
  };

  const { files } = useSelector((state) => state.files);

  const selectedFiles = files.filter(({ selected = false}) => selected === true);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerTitle}>Fav documents</div>
        <div className={styles.headerWrap}>
          <div className={styles.headerFavFiles} onClick={handleSearchAllFiles}>
            See all
          </div>
          <div className={styles.headerClose} onClick={() => setIsHide(!hide)}>
            Hide
          </div>
        </div>
      </div>

      <div
        className={`${styles.panelCollapse} ${hide ? null : styles.panelClose}`}
      >
        <Scroll vertical={false}>
          {selectedFiles
            ? selectedFiles.map((file) => {
                return <FavFilesItem key={file.date + file.name} file={file} />;
              })
            : null}
        </Scroll>
      </div>
    </div>
  );
};

export default FavFilesList;
