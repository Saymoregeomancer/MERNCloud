import styles from "./Auth.module.scss";
import { Auth } from "../../../modules/auth";
import { Loader } from "../../ui";

const Authorization = () => {
  return (
    <div className={styles.container}>
        <Auth/>
        {/* <Loader/> */}
    </div>
  );
};

export default Authorization;
