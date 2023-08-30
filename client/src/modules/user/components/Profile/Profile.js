import styles from "./Profile.module.css";
import photo from "../../../../assets/photo.jpg";
import { useSelector } from "react-redux";
import { convertToGb } from "../../utils/convertToGB";
import { ProgresBar, Button, Popup } from "../../../../view/ui";
import { useNavigate, useLocation } from "react-router-dom";

function copyToClipboard(value) {
  navigator.clipboard
    .writeText(value)
    .then(() => {
      console.log(`Значення "${value}" скопійовано до буфера обміну`);
    })
    .catch((error) => {
      console.error("Помилка під час копіювання:", error);
    });
}

const Profile = () => {
  const { diskSpace, usedSpace, isPremium, userId, avatar, email } =
    useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  const handlePremClick = () => {
    if (location.pathname !== "/settings") {
      navigate("/settings");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.user}>
        {avatar ? (
          <img src={avatar} className={styles.userIcon} alt="User Icon" />
        ) : (
          <div className={styles.avatar}>{email?.charAt(0).toUpperCase()}</div>
        )}
        <div className={styles.userWrap}>
          <div className={styles.username}>{email}</div>
          {isPremium ? (
            <div className={styles.premium}>Premium</div>
          ) : (
            <div onClick={handlePremClick} className={styles.userbutton}>
              <Button contained>prem</Button>
            </div>
          )}
        </div>
      </div>

      {isPremium && (
        <Popup description="Click For Copy">
          <div
            onClick={() => {
              copyToClipboard(userId);
            }}
            className={styles.userIdWrap}
          >
            <span>Id: </span>
            <div className={styles.userId}>{userId}</div>
          </div>
        </Popup>
      )}

      <div className={styles.storage}>
        <div className={styles.storageTitle}>Storage detail</div>
        <div className={styles.storageProgresWrap}>
          <div className={styles.storageProgres}>
            <ProgresBar percent={(usedSpace * 100) / diskSpace} />
          </div>
        </div>
        <div className={styles.storageDescr}>
          {`${convertToGb(usedSpace)}Gb of ${convertToGb(diskSpace)} used`}
        </div>
      </div>
    </div>
  );
};

export default Profile;
