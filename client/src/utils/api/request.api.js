import axios from "axios";
import { getCommonHeaders } from "./requestUtils";
const apiUrl = process.env.REACT_APP_BASE_URL;

export const requestApiPost = async (endpoint, body) => {
  let url = `${apiUrl}/${endpoint}`;
  const headers = getCommonHeaders();
  const response = await axios.post(url, body, { headers });

  return response;
};
export const requestApiGet = async (endpoint, params) => {
  let url = `${apiUrl}/${endpoint}`;
  const headers = getCommonHeaders();
  const response = await axios.get(url, {
    headers,
    params: params,
  });
  return response;
};
export const requestApiDelete = async (endpoint, params) => {
  let url = `${apiUrl}/${endpoint}`;
  const headers = getCommonHeaders();
  const response = await axios.delete(url, {
    headers,
    params: params,
  });
  return response;
};
