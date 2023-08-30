import {
  AiOutlineHeart as DefaultIcon,
  AiFillHeart as ActiveIcon,
} from "react-icons/ai";
import styles from "./Favorite.module.css";

const Favorite = ({ size, isActive = false }) => {
  return isActive ? (
    <ActiveIcon size={size} className={styles.elementActive} />
  ) : (
    <DefaultIcon size={size} className={styles.element} />
  );
};

export default Favorite;
