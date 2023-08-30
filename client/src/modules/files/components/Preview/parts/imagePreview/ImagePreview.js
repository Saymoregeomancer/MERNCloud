import styles from "./ImagePreview.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ImagePreview = () => {
  const { preview } = useSelector((state) => state.preview);
  const [source, setSource] = useState(null);

  useEffect(() => {
    setSource(preview);
    return () => {
      URL.revokeObjectURL(source);
      setSource(null);
    };
  }, [preview]);

  return <img src={source} className={`${styles.image}`} alt="Preview" />;
};

export default ImagePreview;
