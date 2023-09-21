import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as authReducer from "./authSlice";
import * as authActions from "./authActions";
import { useMemo } from "react";

const rootActions = {
  ...authReducer,
    ...authActions,
};

export const useAuthActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => {
    return bindActionCreators(rootActions, dispatch);
  }, [dispatch]);
};
