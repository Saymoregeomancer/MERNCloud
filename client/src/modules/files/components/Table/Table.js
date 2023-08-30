import styles from "./Table.module.css";
import { Scroll } from "../../../../view/ui";
import TableList from "./TableList/TableList";
import { useSelector } from "react-redux";
import TableDash from "./TableDash/TableDash";
import TableDesk from "./TableDesk/TableDesk";
import { Loader } from "../../../../view/ui";

const Table = () => {
  const { view, isLoading } = useSelector((state) => state.files);
  let viewTable;

  if (view === "desk") {
    viewTable = <TableDesk />;
  }
  if (view === "dash") {
    viewTable = <TableDash />;
  } else {
    viewTable = <TableList />;
  }

  return (
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
  );
};

export default Table;
