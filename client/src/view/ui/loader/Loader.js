import styles from "./Loader.module.css";
import img from "./loader.png";
import { useState, useEffect } from "react";

const generateRandoProperties = () => {
  return {
    number: Math.floor(Math.random() * 2),
    position: (Math.floor(Math.random() * 23) - 11) / 10,
    opacity: Number(Math.random().toFixed(1)),
    transform: Math.random() * 0.6 + 0.6,
    delay: (Math.floor(Math.random() * 18) + 2) * 100,
  };
};

const Loader = ({ reverse }) => {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const cloudItems = Array(10)
    .fill()
    .map((_, index) => {
      const properties = generateRandoProperties();
      const style = {
        left: `${properties.position}rem`,
        opacity: properties.opacity,
        transform: `scale(${properties.scale})`,
        animationDelay: `${properties.delay}ms`,
      };

      return (
        <div
          key={index}
          style={style}
          className={`${styles.item} ${
            reverse ? styles.download : styles.upload
          }`}
        >
          {properties.number}
        </div>
      );
    });

  return showLoader ? (
    <div className={`${styles.container} ${styles.fadeIn}`}>
      <div className={styles.wrap}>
        <img src={img} className={styles.cloud}></img>
        <div className={styles.body}>
          <div className={styles.bodyItems}>{cloudItems}</div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Loader;
