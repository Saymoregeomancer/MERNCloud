import styles from "./TableListBodyCell.module.css";
import {Popup} from '../../../../../../view/ui'
import { processString } from "../../../../utils";

const ListName = ({fileName}) => {
  return <div className={styles.name}>{processString(fileName)}</div>;
};

export default ListName;
