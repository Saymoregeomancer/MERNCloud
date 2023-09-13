import { AiFillHeart as ActiveIcon } from "react-icons/ai";
import styles from "./Favorite.module.css";

const Favorite = ({ size, isActive = false }) => {
  return (
    <ActiveIcon
      size={size}
      className={`${styles.element} ${isActive ? styles.elementActive : ""}`}
    />
  );
};

export default Favorite;
