import styles from "./FolderNavigation.module.css";
import { BsThreeDotsVertical as Dot } from "react-icons/bs";
import { useSelector } from "react-redux";
import { MdArrowBack as Arrow } from "react-icons/md";
import { processString } from "../../utils";
import { useFilesAction } from "../../store/files/useFileActions";

function pathGenerator(str = null) {
  if (str === null) {
    return null;
  }
  const pathArray = str.path.split("/").slice(1);
  const finalPathArray = pathArray.length > 2 ? pathArray.slice(-2) : pathArray;
  return {
    originLength: pathArray.length,
    pathArray: finalPathArray,
  };
}

const FolderNavigation = ({}) => {

  const {fetchFiles} = useFilesAction()
  const { currentDir } = useSelector((state) => state.files);

  const pathArray = pathGenerator(currentDir);

  const handlerNavBtn = (parent = null) => {
    fetchFiles(parent);
  };

  return (
    <>
      <div
        onClick={() => handlerNavBtn(currentDir?.parent || null)}
        className={styles.back}
      >
        <Arrow size={70} />
      </div>

      <div className={styles.container}>
        <div className={styles.items}>
          <div onClick={() => handlerNavBtn()} className={styles.itemWrap}>
            <div className={`${styles.item} ${styles.home}`}>Home</div>
          </div>

          {pathArray !== null && pathArray.originLength > 2 && (
            <div className={`${styles.itemWrap} ${styles.dot}`}>
              <div className={styles.item}>
                <Dot size={19} />
              </div>
            </div>
          )}

          {pathArray !== null &&
            pathArray.pathArray.map((elem, index) => (
              <div
                key={`${elem}${index}`}
                className={`${styles.itemWrap} ${styles.dot}`}
              >
                <div className={styles.item}>{processString(elem)}</div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default FolderNavigation;
