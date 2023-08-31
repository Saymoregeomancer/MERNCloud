import { createAsyncThunk } from "@reduxjs/toolkit";
import { requestApiGetFile } from "../../../../utils/api/requestsFile.api";

export const fetchPreview = createAsyncThunk(
  "previewFile/fetchPreview",
  async ({ file, resize = true }) => {
    if (!file._id) {
      return;
    }
    try {
      const params = {
        id: file._id,
        resize: resize,
      };
      const response = await requestApiGetFile(`files/preview`, params);

      const url = URL.createObjectURL(response.data);
      const data = { url: url, type: response.data.type };

      return data;
    } catch (error) {
      console.error(error);
    }
  }
);
