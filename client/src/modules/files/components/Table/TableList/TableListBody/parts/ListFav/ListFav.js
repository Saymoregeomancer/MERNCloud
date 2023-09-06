import styles from "./ListFav.module.css";
import { Favorite } from "../../../../../../../../view/ui";
const ListFav = ({ onClick , fileSelect }) => {
  const handleSelect = async () => {
    await onClick();
  };

  return (
    <div onClick={() => handleSelect()} className={styles.favorite}>
      <Favorite isActive={fileSelect} size={18} />
    </div>
  );
};

export default ListFav;
