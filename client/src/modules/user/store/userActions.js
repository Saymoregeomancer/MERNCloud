import { createAsyncThunk } from "@reduxjs/toolkit";
import { requestApiGet, requestApiPost } from "../../../utils/api/request.api";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  try {
    const response = await requestApiGet("auth/getUser");
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
});

export const increasePlan = createAsyncThunk(
  "user/increasePlan",
  async (space, plan) => {
    try {
      const response = await requestApiPost("auth/increasePlan", {
        space: space,
        plan: plan,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
);
