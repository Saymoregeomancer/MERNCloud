import styles from "./SwitcherPreview.module.css";

import { File } from "../../../../../../view/ui";

import { useSelector } from "react-redux";
import ImagePreview from "../imagePreview/ImagePreview";
import AudioPreview from "../audioPreview/AudioPreview";
import VideoPreview from "../videoPreview/VideoPreview";

const SwitcherPreview = ({ fullScreen = false }) => {
  const { previewType } = useSelector((state) => state.preview);

  const previewComponentMap = {
    image: <ImagePreview />,
    audio: <AudioPreview />,
    video: <VideoPreview fullScreen={fullScreen} />,
  };

  const selectedPreviewComponent =
    previewComponentMap[previewType?.split("/")[0]];

  return (
    <div
      className={`${styles.previewWrap} ${
        fullScreen ? styles.fullScreen : null
      }`}
    >
      {selectedPreviewComponent ? (
        <div className={`${styles.fadeIn} ${styles.preview}`}>
          {selectedPreviewComponent}
        </div>
      ) : (
        <div
          className={`${styles.fadeIn} ${styles.preview} 
          ${fullScreen ? "h-full" : ""}`}
        >
          <File type={previewType || null} size={50} />
        </div>
      )}
    </div>
  );
};

export default SwitcherPreview;
