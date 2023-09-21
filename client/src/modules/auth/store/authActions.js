import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { requestApiSimplePost } from "../../../utils/api/request.api";

const login = createAsyncThunk("auth/login", async ({ email, password }) => {
  try {
    const response = await requestApiSimplePost("auth/login", {
      email: email,
      password: password,
    });
    localStorage.setItem("UserData", JSON.stringify(response.data.token));
    return response.data;
  } catch (error) {
    console.log(error.response);
    throw new Error(error.response.data.message);
  }
});
const registration = createAsyncThunk(
  "registration",
  async ({ email, password }) => {
    try {
      const response = await requestApiSimplePost("auth/registration", {
        email: email,
        password: password,
      });
      return response.data;
    } catch (error) {
      console.log(error.response);
      throw new Error(error.response.data.message);
    }
  }
);

export { login, registration };
