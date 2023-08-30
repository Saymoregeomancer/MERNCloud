import styles from "./UserSettings.module.css";
import img from "../../../../assets/photo.jpg";
import { Button } from "../../../../view/ui";

const UserSettings = ({}) => {
  return (
    <div className={styles.container}>
      <div className={styles.userPhotoWrap}>
        <img className={styles.userPhoto} src={img}></img>
        <div className={styles.buttonWrap}>
          <Button>Choose image</Button>
        </div>
      </div>

      <div className={styles.userDataDescr} >
        <div className={styles.userName}>name</div>
      </div>
    </div>
  );
};

export default UserSettings;
