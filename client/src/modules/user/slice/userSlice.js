import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "../../../utils/request";
export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const data = await request("auth/getUser", "GET");
  return data;
});
export const increasePlan = createAsyncThunk(
  "user/increasePlan",
  async (space, plan) => {
    const data = await request("auth/increasePlan", "POST", null, {
      space: space,
      plan: plan,
    });
    console.log(data);
    return data;
  }
);

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

// export const { setDiskSpace, setUsedSpace, setAvatar, setIsAuth, setLoguot } =
//   authSlice.actions;

export default userSlice.reducer;
