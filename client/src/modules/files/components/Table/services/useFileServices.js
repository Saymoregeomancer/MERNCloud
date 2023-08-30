import { useDispatch, useSelector } from "react-redux";
import { setPreviewFile } from "../../../store/slice/previewSlice";
import { setFiles } from "../../../store/slice/fileSlice";
import { fetchFiles } from "../../../index";
import {
  requestApiGet,
  requestApiDelete,
} from "../../../../../utils/api/request.api";
import {
  setCursorWait, 
  setCursorDefault,
} from "../../../../../utils/cursorChanger";
import { fetchPreview } from "../../../index";
import { requestApiDownloadFile } from "../../../../../utils/api/requestsFile.api";

const useFileServices = (file) => {
  const { files } = useSelector((state) => state.files);
  const dispatch = useDispatch();

  const handleFile = () => {
    if (file.type !== "folder") {
      dispatch(setPreviewFile(file));
      dispatch(fetchPreview({ file, resize: true }));
      return;
    }

    dispatch(fetchFiles(file._id));
  };

  const handleSelectFile = async () => {
    setCursorWait();
    const params = { _id: file._id };
    const response = await requestApiGet("files/select", params);

    if (response.status !== 200) {
      setCursorDefault();
      return;
    }

    const newData = files.map((item) =>
      item._id === file._id ? { ...item, selected: !item.selected } : item
    );

    dispatch(setFiles(newData));
    setCursorDefault();
  };

  const handleDelete = async () => {
    setCursorWait();
    const response = await requestApiDelete("files/delete", { id: file._id });
    if (response.status !== 200) {
      setCursorDefault();
      return;
    }

    const newData = files.filter((item) => item._id !== file._id);
    dispatch(setFiles(newData));
    setCursorDefault();
  };

  const handleDownload = async () => {
    try {
      setCursorWait();
      const params = { id: file._id };
      const response = await requestApiDownloadFile("files/download", params);
      if (response.status !== 200) {
        setCursorDefault();
        return;
      }

      const blob = response.data;
      const fileUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = file.name;
      link.click();
      URL.revokeObjectURL(fileUrl);
      setCursorDefault();
    } catch (error) {
      console.error(error);
    }
  };

  return { handleFile, handleSelectFile, handleDelete, handleDownload };
};

export default useFileServices;
