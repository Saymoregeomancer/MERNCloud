import { createSlice } from "@reduxjs/toolkit";
import { login , registration } from "./authActions";

const initialState = {
  isAuth: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: (state) => initialState
  },
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
        state.error = action.error.message;
      })
      .addCase(registration.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registration.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = !!action.payload.token;
      })
      .addCase(registration.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

// export const {  } =
//   authSlice.actions;

export default authSlice.reducer;
