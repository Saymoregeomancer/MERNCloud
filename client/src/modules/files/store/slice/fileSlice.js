import { createSlice } from "@reduxjs/toolkit";
import { fetchFiles, searchFiles } from "../actions/fileActions";

const initialState = {
  files: [],
  currentDir: null,
  dirStack: [],
  view: "list",
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    setFiles: (state, actions) => {
      state.files = actions.payload;
    },
    setView: (state, actions) => {
      state.view = actions.payload;
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

export const { setView, setFiles } = authSlice.actions;

export default authSlice.reducer;
