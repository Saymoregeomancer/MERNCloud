import { usePreviewActions } from "../../../store/preview/usePreviewActions";
import { useFilesAction } from "../../../store/files/useFileActions";
import { useCallback, useMemo } from "react";

import {
  requestApiGet,
  requestApiDelete,
} from "../../../../../utils/api/request.api";
import {
  setCursorWait,
  setCursorDefault,
} from "../../../../../utils/cursorChanger";

import {
  HiOutlineTrash as Trash,
  HiOutlineCloudDownload as Download,
  HiOutlineShare as Share,
} from "react-icons/hi";

import { requestApiDownloadFile } from "../../../../../utils/api/requestsFile.api";

const useFileServices = (file, isPrem = false, isShared = false) => {
  const { setPreviewFile, fetchPreview } = usePreviewActions();
  const { fetchFiles, setSelect, deleteFile } = useFilesAction();

  const handleFile = useCallback(() => {
    if (file.type !== "folder") {
      setPreviewFile(file);
      fetchPreview({ file, resize: true });
    } else {
      fetchFiles(file._id);
    }
  }, [file, setPreviewFile, fetchPreview, fetchFiles]);

  const handleSelectFile = useCallback(async () => {
    setCursorWait();
    const params = { _id: file._id };
    const response = await requestApiGet("files/select", params);
    if (response.status === 200) {
      setSelect({ id: file._id });
    }
    setCursorDefault();
  }, [file, setSelect]);

  const handleDelete = useCallback(async () => {
    setCursorWait();
    const response = await requestApiDelete("files/delete", { id: file._id });
    if (response.status === 200) {
      deleteFile({ id: file._id });
    }
    setCursorDefault();
  }, [file, deleteFile]);

  const handleDownload = useCallback(async () => {
    try {
      setCursorWait();
      const params = { id: file._id, accessLink: file.accessLink };
      const response = await requestApiDownloadFile(
        !isShared ? "files/download" : "files/downloadShared",
        params
      );
      if (response.status === 200) {
        const blob = response.data;
        const fileUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = file.name;
        link.click();
        URL.revokeObjectURL(fileUrl);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setCursorDefault();
    }
  }, [file]);

  const handleShare = useCallback(async () => {
    try {
      setCursorWait();
    } catch (error) {
      console.error(error);
    } finally {
      setCursorDefault();
    }
  }, [file]);

  const getMenuButtons = useMemo(() => {
    return (afterButtonClickFuntion) => {
      const buttons = [
        {
          title: "Download",
          icon: Download,
          onClick: () => {
            handleDownload();
            if (afterButtonClickFuntion) {
              afterButtonClickFuntion();
            }
          },
        },
      ];

      if (isPrem && !isShared && file.type !== "folder") {
        buttons.push({
          title: "Share",
          icon: Share,
          onClick: () => {
            handleShare();
            if (afterButtonClickFuntion) {
              afterButtonClickFuntion();
            }
          },
        });
      }

      if (!isShared) {
        buttons.push({
          title: "Delete",
          icon: Trash,
          color: "red",
          onClick: () => {
            handleDelete();
          },
        });
      }

      return buttons;
    };
  }, [handleDownload, handleShare, handleDelete, isPrem, isShared, file]);

  return {
    handleFile,
    handleSelectFile,
    handleDelete,
    handleDownload,
    handleShare,
    getMenuButtons,
  };
};

export default useFileServices;
