import styles from "./ViewSwitcher.module.css";

import { FaList as List } from "react-icons/fa";
import { MdViewModule as Small, MdGridView as Big } from "react-icons/md";
import { useSelector } from "react-redux";

import { useFilesAction } from "../../store/files/useFileActions";
import DynamicComponent from "../../../../utils/DynamicComponent";

const initialState = [
  { type: "dash", component: Small },
  { type: "list", component: List },
  { type: "desk", component: Big },
];

const ViewSwitcher = ({}) => {
  const { setView } = useFilesAction();
  const { view } = useSelector((state) => state.files);

  const activeIndex = initialState.findIndex((obj) => obj.type === view);

  const onHandler = () => {
    let nextTypeIndex = activeIndex === 2 ? 0 : activeIndex + 1;
    setView(initialState[nextTypeIndex].type);
  };
  return (
    <div onClick={onHandler} className={styles.container}>
      <DynamicComponent
        component={initialState[activeIndex].component}
        size={19}
      />
    </div>
  );
};

export default ViewSwitcher;
