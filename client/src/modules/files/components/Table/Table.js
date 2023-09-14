import styles from "./Table.module.css";
import { Scroll,Loader } from "../../../../view/ui";
import { useMemo } from "react";
import { useSelector } from "react-redux"
;
import TableList from "./TableList/TableList";
import TableDash from "./TableDash/TableDash";
import TableDesk from "./TableDesk/TableDesk";
import TableContext from "./utils/useTableContext";

const Table = ({ isShared = false, isPremium = false }) => {
  const { view, isLoading } = useSelector((state) => state.files);
  const viewTable = useMemo(() => {
    switch (view) {
      case "desk":
        return <TableDesk />;
      case "dash":
        return <TableDash />;
      case "list":
        return <TableList />;
    }
  }, [view]);

  let contextValue = {
    isPremiumTable: isPremium,
    isSharedTable: isShared,
  };

  return (
    <TableContext.Provider value={contextValue}>
      <div className={styles.container}>
        {isLoading ? (
          <div className={styles.loader}>
            <Loader reverse />
          </div>
        ) : (
          <Scroll>
            <div className={styles.wrap}>{viewTable}</div>
          </Scroll>
        )}
      </div>
    </TableContext.Provider>
  );
};

export default Table;
