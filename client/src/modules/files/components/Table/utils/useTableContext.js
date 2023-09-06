import React, { useContext } from "react";

const TableContext = React.createContext();

export default TableContext;

export const useTableContext = () => {
  const context = useContext(TableContext);

  if (!context) {
    throw new Error("use Table Context Error");
  }

  return context
};
