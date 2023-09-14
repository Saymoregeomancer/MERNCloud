import styles from "./ChangePlan.module.css";

import Card from "./parts/card/Card";
import Planner from "./parts/planner/Planner";
import Bill from "./parts/bill/Bill";

import { useSelector } from "react-redux";
import { useState } from "react";
import { useUserAction } from "../../store/useUserActions";

const ChangePlan = ({}) => {
  const { increasePlan } = useUserAction();
  const { isPremium } = useSelector((state) => state.user);

  const [cardData, setCardData] = useState(null);
  const [planData, setPlanData] = useState(null);

  const [viewIndex, setViewIndex] = useState(0);

  const handleChangeView = () => {
    setViewIndex((viewIndex + 1) % 3);
    if (viewIndex == 2) {
      increasePlan(planData.space, planData.plan);
    }
  };
  const componentCircle = [
    <Planner buttonFunc={handleChangeView} returnData={setPlanData} />,
    <Card returnData={setCardData} buttonFunc={handleChangeView} />,
    <Bill buttonFunc={handleChangeView} plan={planData} />,
  ];

  return (
    <div className={styles.sector}>
      <div className={styles.container}>
        {componentCircle[viewIndex]}

        {!isPremium && (
          <div className={styles.description}>
            By signing up for a premium subscription, you not only increase the
            amount of memory available to you in the storage, but also get the
            ability to share files with other users
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangePlan;
