import { userReducer } from "../modules/user/index";
import { authReducer } from "../modules/auth";
import { fileReducer, previewReducer } from "../modules/files";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  files: fileReducer,
  preview: previewReducer,
});

export function setupStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
