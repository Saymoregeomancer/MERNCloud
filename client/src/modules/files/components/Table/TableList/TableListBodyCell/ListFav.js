import styles from "./TableListBodyCell.module.css";
import { Favorite } from "../../../../../../view/ui";
const ListFav = ({ selectFunc , fileSelect }) => {
  const handleSelect = async () => {
    await selectFunc();
  };

  return (
    <div onClick={() => handleSelect()} className={styles.favorite}>
      <Favorite isActive={fileSelect} size={18} />
    </div>
  );
};

export default ListFav;
