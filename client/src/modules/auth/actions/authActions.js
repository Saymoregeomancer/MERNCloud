import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: email,
          password: password,
        }
      );
      // console.log(response.data)
      if (response.status === 200) {
        localStorage.setItem("UserData", JSON.stringify(response.data));
        return response.data;
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.log(error.response);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
const registration = createAsyncThunk(
  "registration",
  async ({ email, password }, thunkAPI) => {
    console.log({ email, password });
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/registration",
        {
          email: email,
          password: password,
        }
      );
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export { login, registration };
