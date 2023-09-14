import { createAsyncThunk } from "@reduxjs/toolkit";
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