import styles from "./Alert.module.css";
import { useEffect, useState } from "react";

const Alert = ({ message, type = "error" }) => {
  const [isVisible, setIsVisible] = useState(false);
  // const [stateMessage, setStateMessage] = useState(null);

  useEffect(() => {
    if (message) {
      setIsVisible(true);

      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    } else {
      setIsVisible(false);
    }

    return () => {
      setIsVisible(false);
    };
  }, [message]);

  let typeClass = "";
  let icon = "";

  switch (type) {
    case "success":
      typeClass = styles.success;
      icon = "✔";
      break;
    case "warning":
      typeClass = styles.warning;
      icon = "⚠";
      break;
    default:
      typeClass = null;
      icon = "✕";
      break;
  }

  return isVisible ? (
    <div className={`${styles.container} ${typeClass}`}>
      <p className={styles.icon}>{icon}</p>
      <div className={styles.text}>{message}</div>
    </div>
  ) : null;
};

export default Alert;
