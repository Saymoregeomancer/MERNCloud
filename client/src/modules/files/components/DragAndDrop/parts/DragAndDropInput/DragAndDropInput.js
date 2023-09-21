import styles from "./DragAndDropInput.module.css";
import { Button } from "../../../../../../view/ui";
import { useState, useRef } from "react";
const DragAndDropInput = ({ handleFile }) => {
  const fileInputRef = useRef(null);

  const handleChooseFile = () => {
    fileInputRef.current.click();
  };

  const [dragging, setDragging] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  return (
    <div
      className={dragging ? styles.drag : styles.input}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <p className={styles.text}>
        Drag and drop your file here <br /> or
      </p>
      <div className={styles.buttonWrap}>
        <Button
          className={styles.uploadBtn}
          onClick={handleChooseFile}
          disabled={dragging}
        >
          Click to Upload
        </Button>
      </div>
      <input
        type="file"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileInputChange}
      />
    </div>
  );
};

export default DragAndDropInput;
