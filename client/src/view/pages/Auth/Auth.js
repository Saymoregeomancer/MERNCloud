import styles from "./Auth.module.scss";
import { Auth } from "../../../modules/auth";
import { Loader } from "../../ui";
import logo from "../../../assets/logo.png";
const Authorization = () => {
  return (
    <div className={styles.container}>
      <div className={styles.leftSideWrap}>
        <div className={styles.leftSide}>
          <p className={styles.sideTitle}>Wellcome page</p>
          <p className={styles.sideSubTitle}>Sin in / sing up</p>
          <div className={styles.sideFormWrap}>
            <Auth />
          </div>
          <div className={styles.descrWrap}>
            <div className={styles.descrLoader}>
              <Loader />
            </div>
            <div className={styles.descr}>
              <p className={styles.descrTitle}>
                All personal data is protected
              </p>
              <p className={styles.descrSubTitle}>
                we carefully protect your personal data and are responsible for
                it
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.rightSide}>
        <div className={styles.rightSideHeader}>
          <img src={logo} className={styles.rightSideHeaderLogo}></img>
          <p className={styles.rightSideHeaderTitle}>About us...</p>
        </div>
        <p className={styles.paragraph}>
          We are your reliable partner in digital storage. Our company
          specializes in providing advanced cloud storage for storing, sharing
          and protecting your data.
        </p>

        <p className={styles.paragraph}>
          We create convenient, secure and affordable solutions for your
          business or personal use.
        </p>
        <p className={styles.paragraph}>
          Our goal is to make your life easier and safer in the digital world by
          providing access to your data from any device and under any
          conditions. You can trust us with the safekeeping of your most
          valuable information assets.
        </p>
      </div>
    </div>
  );
};

export default Authorization;
