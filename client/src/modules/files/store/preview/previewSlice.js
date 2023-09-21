import { createSlice } from "@reduxjs/toolkit";
import { fetchPreview } from "./previewActions";

const initialState = {
  previewFile: null,
  preview: null,
  previewType: null,
  isLoading: null,
  error: null,
};

const previewSlice = createSlice({
  name: "previewFile",
  initialState,
  reducers: {
    setPreviewFile: (state, action) => {
      state.previewFile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPreview.pending, (state) => {
        state.isLoading = true;
        state.preview = null;
        state.previewType = null;
        state.error = null;
      })
      .addCase(fetchPreview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.preview = action?.payload?.url;
        state.previewType = action?.payload?.type;
      })
      .addCase(fetchPreview.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action)
        state.error = action.error.message;
      });
  },
});

export const { setPreviewFile } = previewSlice.actions;

export default previewSlice.reducer;
