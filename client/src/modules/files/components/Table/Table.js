import styles from "./Table.module.css";
import { Scroll } from "../../../../view/ui";
import TableList from "./TableList/TableList";
import { useSelector } from "react-redux";
import TableDash from "./TableDash/TableDash";
import TableDesk from "./TableDesk/TableDesk";
import { Loader } from "../../../../view/ui";
import TableContext from "./utils/useTableContext";

const Table = () => {
  const { view, isLoading } = useSelector((state) => state.files);
  let viewTable;

  if (view === "desk") {
    viewTable = <TableDesk />;
  }
  if (view === "dash") {
    viewTable = <TableDash />;
  }
  if (view === "list") {
    viewTable = <TableList />;
  }

  let contextValue = {
    isPremiumTable: false,
    isSharedTable: false,
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
