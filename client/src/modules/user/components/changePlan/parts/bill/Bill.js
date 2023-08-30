import styles from "./Bill.module.css";
import { useEffect } from "react";

const Bill = ({ plan, buttonFunc }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      buttonFunc();
    }, 5000);

    return () => clearTimeout(timer); // Забезпечуємо очищення таймера при зміні компонента
  }, [buttonFunc]);

  return (
    <div className={styles.container}>
      <div className={styles.descr}>
        You have almost subscribed <span>{plan.space}GB</span> for{" "}
        <span>{plan.period}GB</span>, since we have not yet connected the
        service for payment, we will simply give you more memory
      </div>
    </div>
  );
};

export default Bill;
