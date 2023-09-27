import styles from "./TableSkeleton.module.css";
import { Skeleton, Button } from "../../../ui";
import { AiOutlineLock } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const TableSkeleton = ({}) => {
  const navigate = useNavigate();

  const handleButton = () => {
    if (window.location.pathname !== "/settings") {
      navigate("/settings");
    }
  };

  return (
    <div className={styles.container}>
      {[...Array(6)].map((_, rowIndex) => (
        <div className={styles.cell} key={rowIndex}>
          {[...Array(4)].map((_, colIndex) => (
            <div className={styles.wrap} key={colIndex}>
              <Skeleton size={5} />
            </div>
          ))}
        </div>
      ))}
      <div className={styles.premWrap}>
        <div className={styles.icon}>
          <AiOutlineLock size={60} />
        </div>
        <p className={styles.title}>This is premium feature</p>
        <div className={styles.buttonWrap}>
          <Button onClick={handleButton}>Unlock premium</Button>
        </div>
      </div>
    </div>
  );
};

export default TableSkeleton;
