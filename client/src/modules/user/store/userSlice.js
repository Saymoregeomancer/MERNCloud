import { createSlice } from "@reduxjs/toolkit";
import { fetchUser , increasePlan } from "./userActions";

const initialState = {
  diskSpace: 0,
  usedSpace: 0,
  avatar: null,
  isLoading: false,
  error: null,
  isPremium: false,
  userId: null,
  email: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.diskSpace = action.payload.diskSpace;
        state.usedSpace = action.payload.usedSpace;
        state.userId = action.payload.id;
        state.email = action.payload.email;
        state.isPremium = action.payload.isPremium;
        state.isLoading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(increasePlan.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(increasePlan.fulfilled, (state, action) => {
        state.diskSpace = action.payload.diskSpace;
        state.usedSpace = action.payload.usedSpace;
        state.userId = action.payload.id;
        state.email = action.payload.email;
        state.isPremium = action.payload.isPremium;
        state.isLoading = false;
      })
      .addCase(increasePlan.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
