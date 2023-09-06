import styles from "./ViewSwitcher.module.css";

import { FaList as List } from "react-icons/fa";
import { MdViewModule as Small, MdGridView as Big } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";

import { setView } from "../../store/slice/fileSlice";
import DynamicComponent from "../../../../utils/DynamicComponent";

const initialState = [
  { type: "list", component: List },
  { type: "dash", component: Small },
  { type: "desk", component: Big },
];

const ViewSwitcher = ({}) => {
  const dispatch = useDispatch();
  const { view } = useSelector((state) => state.files);

  const activeIndex = initialState.findIndex((obj) => obj.type === view);

  const onHandler = () => {
    let nextTypeIndex = activeIndex === 2 ? 0 : activeIndex + 1;
    dispatch(setView(initialState[nextTypeIndex].type));
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
