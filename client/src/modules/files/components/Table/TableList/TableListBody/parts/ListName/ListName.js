import React, { useState } from "react";
import styles from "./ListName.module.css";
import { processString } from "../../../../../../utils";

const ListName = ({ fileName, onClick }) => {
  const fileNameLength = fileName.length;
  const [hover, setHover] = useState(false);

  const toggleHover = () => {
    if (fileNameLength >= 50) {
      setHover(!hover);
    }
  };

  const renderFileName = () => {
    if (fileNameLength > 50) {
      return hover ? (
        <p className={styles.marquee}>{fileName}</p>
      ) : (
        <p>{processString(fileName)}</p>
      );
    }
    return <p>{fileName}</p>;
  };

  return (
    <div
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
      className={styles.container}
      onClick={onClick}
    >
      {renderFileName()}
    </div>
  );
};

export default ListName;
