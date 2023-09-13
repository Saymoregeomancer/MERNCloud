import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as filesReducer from "./fileSlice";
import * as filesActions from "./fileActions";
import { useMemo } from "react";

const rootActions = {
  ...filesActions,
  ...filesReducer,
};

export const useFilesAction = () => {
  const dispatch = useDispatch();

  return useMemo(() => {
    return bindActionCreators(rootActions, dispatch);
  }, [dispatch]);
};
