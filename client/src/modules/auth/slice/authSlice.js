import { createSlice } from "@reduxjs/toolkit";
import { login } from "../actions/authActions";

const initialState = {
  isAuth: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = !!action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        // state.error = action.error.message; // зберігаємо текст помилки в стейт
      });
  },
});

export const { setDiskSpace, setUsedSpace, setAvatar, setIsAuth, setLoguot } =
  authSlice.actions;

export default authSlice.reducer;
