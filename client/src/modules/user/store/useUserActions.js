import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
// import * as userReducer from "./userSlice";
import * as userActions from "./userActions";
import { useMemo } from "react";

const rootActions = {
  ...userActions,
  //   ...userReducer,
};

export const useUserAction = () => {
  const dispatch = useDispatch();

  return useMemo(() => {
    return bindActionCreators(rootActions, dispatch);
  }, [dispatch]);
};
