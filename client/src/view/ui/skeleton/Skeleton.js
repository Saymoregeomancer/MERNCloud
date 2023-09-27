import React, { useEffect, useState } from "react";
import styles from "./Skeleton.module.css";

const Skeleton = ({ type = "span", size = 1 }) => {
  let element;

  switch (type) {
    case "span":
      element = (
        <div className={styles.span} style={{ height: `${size}rem` }}>
          <div
            className={styles.light}
            style={{ height: `${size * 3}rem` }}
          ></div>
        </div>
      );
      break;
    case "circle":
      element = (
        <div
          className={styles.circle}
          style={{ height: `${size}rem`, width: `${size}rem` }}
        >
          <div
            className={styles.light}
            style={{ height: `${size * 3}rem` }}
          ></div>
        </div>
      );
      break;
    case "square":
      element = (
        <div
          className={`${styles.square} `}
          style={{ height: `${size}rem`, width: `${size}rem` }}
        >
          <div
            className={styles.light}
            style={{ height: `${size * 3}rem` }}
          ></div>
        </div>
      );
      break;
  }

  return element ;
};

export default Skeleton;
