import styles from "./Planner.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Button } from "../../../../../../view/ui";

import { Range } from "../../../../../../view/ui";
import { convertToGb } from "../../../../utils/convertToGB";
const totalPrice = (period, spaceSize, currentSpaceSize) => {
  let price = (spaceSize - currentSpaceSize) / 2;
  if (period >= 2 && period <= 6) {
    price = price * 6 * 0.883;
  } else if (period > 6 && period <= 12) {
    price = price * 12 * 0.8332;
  } else {
    price = price * 1;
  }

  price = parseFloat(price).toFixed(2);

  return price;
};

const Planner = ({ buttonFunc, returnData }) => {
  const { diskSpace, isPremium } = useSelector((state) => state.user);

  let diskSpaceInGb = convertToGb(diskSpace);

  let initSpaceState =
    convertToGb(+diskSpace) > 100 && convertToGb(+diskSpace) + 10 > 100
      ? 100
      : +convertToGb(diskSpace) + 10;

  const [spaceValue, setSpaceValue] = useState(initSpaceState);
  const [period, setPeriod] = useState(6);

  const handeConfirmPlan = () => {
    if (convertToGb(diskSpace) == spaceValue) {
      return;
    }
    returnData({ space: spaceValue, period: period });
    buttonFunc();
  };

  const handleRange = (e) => {
    setSpaceValue(parseFloat(e.target.value));
  };
  const handlePeriod = (number) => {
    setPeriod(number);
  };

  return (
    <div className={styles.planContainer}>
      <div className={styles.planWrap}>
        <div className={styles.title}>
          You current space: {convertToGb(diskSpace)}GB
        </div>
        <div className={styles.rangeWrap}>
          <Range
            value={spaceValue}
            onChange={handleRange}
            min={diskSpaceInGb}
            max={100}
          />
          <div className={styles.rangeSpace}>
            <div className={styles.rangeSpaceNumber}>{diskSpaceInGb}GB</div>
            <div className={styles.rangeSpaceNumber}>{spaceValue}GB</div>
            <div className={styles.rangeSpaceNumber}>100Gb</div>
          </div>
        </div>
        <div className={styles.title}>Select plan: payment every</div>
        <div className={styles.priceWrap}>
          <div className={styles.priceButtonWrap}>
            <div
              onClick={() => handlePeriod(1)}
              className={`${styles.priceButton} ${
                period == 1 ? styles.priceButtonActive : null
              }`}
            >
              month
            </div>
            <div
              onClick={() => handlePeriod(6)}
              className={`${styles.priceButton} ${
                period == 6 ? styles.priceButtonActive : null
              }`}
            >
              6 months
            </div>
            <div
              onClick={() => handlePeriod(12)}
              className={`${styles.priceButton} ${
                period == 12 ? styles.priceButtonActive : null
              }`}
            >
              year
            </div>
          </div>
          <div className={styles.price}>
            total: <span>{spaceValue}GB </span>
            for{" "}
            <span>
              {totalPrice(period, spaceValue, convertToGb(diskSpace))}$
            </span>
          </div>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <div onClick={handeConfirmPlan} className={styles.buttonWrap}>
          <Button>{isPremium ? "More space" : "Up to prem"}</Button>
        </div>
      </div>
    </div>
  );
};

export default Planner;
