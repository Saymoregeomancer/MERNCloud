import { createAsyncThunk } from "@reduxjs/toolkit";
import { requestApiGet } from "../../../../utils/api/request.api";

export const fetchFiles = createAsyncThunk(
  "files/fetchFiles",
  async (parent = null) => {
    try {
      const params = {
        parent: parent,
      };
      const response = await requestApiGet("files/getFiles", params);
      // const response = await requestApiGet(
      //   !isShared ? "files/getFiles" : "files/getShared",
      //   params
      // );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);
export const fetchSharedFiles = createAsyncThunk(
  "files/fetchFiles",
  async (parent = null) => {
    try {
      const params = {
        parent: parent,
      };
      const response = await requestApiGet("files/getShared", params);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const searchFiles = createAsyncThunk(
  "files/searchFiles",
  async (param) => {
    let paramObj = {};
    if (typeof param === "boolean") {
      Object.assign(paramObj, { select: param });
    } else {
      Object.assign(paramObj, { name: param });
    }
    const response = await requestApiGet("files/search", paramObj);
    return response.data;
  }
);
