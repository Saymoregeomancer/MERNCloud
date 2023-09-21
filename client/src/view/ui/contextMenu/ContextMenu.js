import { useState, useEffect, useRef } from "react";
import styles from "./ContextMenu.module.css";

const ContextMenu = ({ children, isShow, menuStyle = null, menuRef }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  // console.log(window.screen.width)
  useEffect(() => {
    if (isShow) {
      setCoordinates({ x: window.event?.clientX, y: window.event?.clientY });
    }
    setIsMounted(isShow);
  }, [isShow]);

  return (
    <div
      ref={menuRef}
      className={`
      ${styles.container} ${
        isMounted ? styles.fadeIn : styles.fadeOut
      } ${menuStyle} 
      `}
      style={{
        left: `${coordinates.x}px `,
        top: `${coordinates.y + 10}px `,
        zIndex: "100",
      }}
    >
      {isMounted && <div className={styles.wrap}>{children}</div>}
    </div>
  );
};

export default ContextMenu;
