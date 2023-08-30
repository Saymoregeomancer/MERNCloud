import { createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "../../../../utils/request";

export const fetchFiles = createAsyncThunk(
  "files/fetchFiles",
  async (parent = null) => {
    try {
      const params = {
        parent: parent,
      };
      const data = await request("files/getFiles", "GET", params);
      return data;
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
    const data = await request("files/search", "GET", paramObj);
    return data;
  }
);
