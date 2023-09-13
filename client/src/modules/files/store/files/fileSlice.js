import { createSlice } from "@reduxjs/toolkit";
import { fetchFiles, searchFiles } from "./fileActions";

const initialState = {
  files: [],
  currentDir: null,
  dirStack: [],
  view: "list",
  isLoading: false,
  error: null,
};

const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    setView: (state, actions) => {
      state.view = actions.payload;
    },
    setSelect: (state, action) => {
      const { id } = action.payload;
      state.files = state.files.map((obj) => {
        if (obj._id === id) {
          return { ...obj, selected: !obj.selected };
        }
        return obj;
      });
    },
    deleteFile: (state, action) => {
      const { id } = action.payload;
      state.files = state.files.filter((file) => file._id !== id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFiles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFiles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.files = action.payload.files;
        state.currentDir = action.payload.parent;
      })
      .addCase(fetchFiles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(searchFiles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchFiles.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action);
        state.files = action.payload.files;
        state.currentDir = null;
      })
      .addCase(searchFiles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { setView, setSelect ,deleteFile } = filesSlice.actions;

export default filesSlice.reducer;
