import { useState, useEffect } from "react";
import styles from "./ContextMenu.module.css";

const ContextMenu = ({ children, isShow, menuStyle = null }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(isShow);
  }, [isShow]);

  return (
    <div
      className={`
      ${styles.container} 
      ${isMounted ? styles.fadeIn : styles.fadeOut}
      ${menuStyle} 
      `}
    >
      {isMounted && <div className={styles.wrap}>{children}</div>}
    </div>
  );
};

export default ContextMenu;
