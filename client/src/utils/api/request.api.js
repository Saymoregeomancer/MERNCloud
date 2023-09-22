import axios from "axios";
import { getCommonHeaders, checkResponse } from "./requestUtils";
const apiUrl = process.env.REACT_APP_BASE_URL;

export const requestApiPost = async (endpoint, body) => {
  try {
    let url = `${apiUrl}/${endpoint}`;
    const headers = getCommonHeaders();
    const response = await axios.post(url, body, { headers });
    return response;
  } catch (error) {
    checkResponse(error.response);
    return error.response;
  }
};
export const requestApiGet = async (endpoint, params) => {
  try {
    let url = `${apiUrl}/${endpoint}`;
    const headers = getCommonHeaders();
    const response = await axios.get(url, {
      headers,
      params: params,
    });
    return response;
  } catch (error) {
    checkResponse(error.response);
    return error.response;
  }
};
export const requestApiDelete = async (endpoint, params) => {
  try {
    let url = `${apiUrl}/${endpoint}`;
    const headers = getCommonHeaders();
    const response = await axios.delete(url, {
      headers,
      params: params,
    });

    return response;
  } catch (error) {
    checkResponse(error.response);
    return error.response;
  }
};

export const requestApiSimplePost = async (endpoint, body) => {
  try {
    let url = `${apiUrl}/${endpoint}`;
    const response = await axios.post(url, body);
    return response;
  } catch (error) {
    checkResponse(error.response);
    return error.response;
  }
};
