import styles from "./DrugAndDrop.module.css";

import { requestApiUploadFile } from "../../../../utils/api/requestsFile.api";
import { Button, ProgresBar, Alert } from "../../../../view/ui";
import { useFilesAction } from "../../store/files/useFileActions";
import { useState, useRef } from "react";
import { useSelector } from "react-redux";

const DrugAndDrop = () => {
  const [dragging, setDragging] = useState(false);
  const { fetchFiles } = useFilesAction();
  const fileInputRef = useRef(null);
  const { currentDir } = useSelector((state) => state.files);
  const [sendingFile, setSendingFile] = useState(false);
  const [sendingFileError, setSendingFileError] = useState(null);
  const [progresPercent, setProgresPercent] = useState(0);

  const uploadFile = async (file, parent = "null") => {
    try {
      setSendingFileError(null);
      setSendingFile(true);
      const response = await requestApiUploadFile(
        "files/upload",
        parent,
        file,
        setProgresPercent
      );
      fetchFiles(currentDir === null ? null : currentDir._id);
      setSendingFile(false);
    } catch (e) {
      setSendingFileError(e.response.data.message);
      setSendingFile(false);
      console.log(e.message);
    }
  };

  const handleFile = (file) => {
    uploadFile(file, currentDir);
  };

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

  const handleChooseFile = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={styles.container}>
      {sendingFile ? (
        <div className={styles.progresWrap}>
          <div className={styles.progresTitle}>Don`t reload page</div>
          <div className={styles.progresPercent}>{progresPercent}%</div>
          <div className={styles.progresBarWrap}>
            <ProgresBar percent={progresPercent} />
          </div>
        </div>
      ) : (
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
      )}

      <Alert message={sendingFileError} />
    </div>
  );
};

export default DrugAndDrop;
