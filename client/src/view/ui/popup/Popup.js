import styles from "./popup.module.css";
import { useState } from "react";

const initialState = { clientX: 0, clientY: 0 };

const Popup = ({ children, description = null }) => {
  const [visible, setVisible] = useState(false);
  const [coordinates, setCoordinates] = useState(initialState);
  let hoverTimer = null;

  const handleMouseEnter = async (e) => {
    if (description === null) {
      return;
    }

    hoverTimer = setTimeout(() => {
      setCoordinates({ clientX: e.clientX, clientY: e.clientY });
      setVisible(true);
    }, 1000);
  };

  const handleMouseLeave = () => {
    if (description === null) {
      return;
    }
    clearTimeout(hoverTimer);
    setVisible(false);
    setCoordinates(initialState);
  };
  return (
    <div
      className={styles.container}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {visible && description !== null && (
        <div
          className={`${styles.text} ${
            visible ? styles.fadeIn : styles.fadeOut
          }`}
          style={{
            top: `${coordinates.clientY + 10}px`,
            left: `${coordinates.clientX + 10}px`,
          }}
        >
          {description}
        </div>
      )}
    </div>
  );
};

export default Popup;
