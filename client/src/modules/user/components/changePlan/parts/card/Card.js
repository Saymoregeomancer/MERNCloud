import { useRef, useState } from "react";
import styles from "./Card.module.css";
import { FcSimCardChip } from "react-icons/fc";
import { SiVisa, SiMastercard } from "react-icons/si";
import { Button } from "../../../../../../view/ui";

const Card = ({ returnData, buttonFunc }) => {
  const [cardData, setCardData] = useState({
    first: null,
    second: null,
    third: null,
    fourth: null,
    tillmonth: null,
    tillyear: null,
    cvv: null,
  });

  const handleChangeInput = (event) => {
    let value = event.target.value;

    if (+event.target.value > +event.target.max) {
      value = event.target.max;
    }
    const buffer = {};
    buffer[`${event.target.name}`] = value;

    setCardData({ ...cardData, ...buffer });
  };

  const handeConfirmPlan = () => {
    returnData(cardData);
    buttonFunc();
  };

  return (
    <div className={styles.container}>
      <div className={styles.cardWrap}>
        <div className={styles.card}>
          <div className={styles.cardFront}>
            <div className={styles.cardFrontHead}>
              <div className={styles.cardFrontHeadItem}>
                <FcSimCardChip size={40} />
              </div>
              <div className={styles.cardFrontHeadItem}>
                <SiVisa size={40} />
                <span className={styles.spanSpace}>/</span>

                <SiMastercard size={40} />
              </div>
            </div>

            <div className={styles.cardFrontBody}>
              <input
                placeholder="0000"
                className={`${styles.cardFrontBodyInput} ${styles.input}`}
                max={9999}
                type="number"
                name="first"
                value={cardData.first}
                onChange={(e) => handleChangeInput(e)}
              ></input>
              <input
                placeholder="0000"
                className={`${styles.cardFrontBodyInput} ${styles.input}`}
                max={9999}
                type="number"
                name="second"
                value={cardData.second}
                onChange={(e) => handleChangeInput(e)}
              ></input>
              <input
                placeholder="0000"
                className={`${styles.cardFrontBodyInput} ${styles.input}`}
                max={9999}
                type="number"
                name="third"
                value={cardData.third}
                onChange={(e) => handleChangeInput(e)}
              ></input>
              <input
                placeholder="0000"
                className={`${styles.cardFrontBodyInput} ${styles.input}`}
                max={9999}
                type="number"
                name="fourth"
                value={cardData.fourth}
                onChange={(e) => handleChangeInput(e)}
              ></input>
            </div>
            <div className={styles.cardFrontFoot}>
              <div className={styles.cardFrontFootItem}>
                <div className={styles.cardFrontFootItemSubtitle}>
                  Valid till:
                </div>
                <div className={styles.cardFrontFootItemTitle}>
                  <input
                    placeholder="12"
                    max={12}
                    type="number"
                    name="tillmonth"
                    value={cardData.tillmonth}
                    onChange={(e) => handleChangeInput(e)}
                    className={`${styles.cardFrontFootItemTitleTill} ${styles.input}`}
                  ></input>
                  <span className={styles.spanSpace}>/</span>
                  <input
                    name="tillyear"
                    value={cardData.tillyear}
                    type="number"
                    max={99}
                    placeholder="15"
                    onChange={(e) => handleChangeInput(e)}
                    className={`${styles.cardFrontFootItemTitleTill} ${styles.input}`}
                  ></input>
                </div>
              </div>
              <div className={styles.cardFrontFootItem}>
                <div className={styles.cardFrontFootItemSubtitle}>CVV:</div>
                <div className={styles.cardFrontFootItemTitle}>
                  <input
                    className={`${styles.cardFrontFootItemCvv} ${styles.input}`}
                    maxLength={3}
                    placeholder="999"
                    name="cvv"
                    value={cardData.cvv}
                    type="number"
                    max={999}
                    onChange={(e) => handleChangeInput(e)}
                  ></input>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <div onClick={handeConfirmPlan} className={styles.buttonWrap}>
          <Button>Confirm</Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
