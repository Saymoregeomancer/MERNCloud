import axios from "axios";
import { getCommonHeaders } from "./requestUtils";
const apiUrl = process.env.REACT_APP_BASE_URL;

export const requestApiDownloadFile = async (endpoint, params) => {
  const url = `${apiUrl}/${endpoint}`;
  const headers = getCommonHeaders();

  const response = await axios.get(url, {
    headers,
    params: params,
    responseType: "blob",
  });

  return response;
};

export const requestApiGetFile = async (endpoint, params) => {
  const url = `${apiUrl}/${endpoint}`;
  const headers = getCommonHeaders();

  const response = await axios.get(url, {
    headers,
    params: params,
    responseType: "blob",
  });

  return response;
};

export const requestApiUploadFile = async (
  endpoint,
  parent,
  file,
  onProgress
) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("name", file.name);
  formData.append("parent", parent == null ? null : parent._id);

  const url = `${apiUrl}/${endpoint}`;
  const headers = getCommonHeaders();

  const axiosConfig = {
    data: formData,
    headers: headers,
  };

  if (onProgress) {
    axiosConfig.onUploadProgress = (progressEvent) => {
      const progress = Math.round(
        (progressEvent.loaded / progressEvent.total) * 100
      );
      onProgress(progress);
    };
  }

  const response = await axios.post(url, formData, axiosConfig);

  return response;
};
