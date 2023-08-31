import styles from "./VideoPreview.module.css";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const VideoPreview = ({ fullScreen }) => {
  const videoRef = useRef(null);

  const { preview } = useSelector((state) => state.preview);
  const [source, setSource] = useState(null);

  useEffect(() => {
    setSource(preview);
  }, [preview]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [preview]);

  const handleVideoEnd = () => {
    console.log("Відео завершило відтворення, видалення...");
    // Видалення відео після відтворення
  };

  return (
    <div className={styles.container}>
      <video
        ref={videoRef}
        className={styles.video}
        controls
        onEnded={handleVideoEnd}
      >
        <source src={source} type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoPreview;
