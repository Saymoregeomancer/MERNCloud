import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as previewReducer from "./previewSlice";
import * as previewActions from "./previewActions";
import { useMemo } from "react";

const rootActions = {
  ...previewActions,
  ...previewReducer,
};

export const usePreviewActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => {
    return bindActionCreators(rootActions, dispatch);
  }, [dispatch]);
};
