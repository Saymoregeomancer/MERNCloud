import styles from "./DrugAndDrop.module.css";

import { requestApiUploadFile } from "../../../../utils/api/requestsFile.api";
import { Button, ProgresBar, Alert } from "../../../../view/ui";
import { useFilesAction } from "../../store/files/useFileActions";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import DragAndDropProgress from "./parts/DragAndDropProgress/DragAndDropProgress";
import DragAndDropInput from "./parts/DragAndDropInput/DragAndDropInput";

const DragAndDrop = () => {
  const { fetchFiles } = useFilesAction();
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
    }
  };

  const handleFile = async (file) => {
    setSendingFileError(null);
    if (file && file?.size > 2000000) {
      setSendingFileError("File to large...");
      return;
    }
    await uploadFile(file, currentDir);
  };

  return (
    <div className={styles.container}>
      {sendingFile ? (
        <DragAndDropProgress progresPercent={progresPercent} />
      ) : (
        <DragAndDropInput handleFile={handleFile} />
      )}

      <Alert message={sendingFileError} />
    </div>
  );
};

export default DragAndDrop;
