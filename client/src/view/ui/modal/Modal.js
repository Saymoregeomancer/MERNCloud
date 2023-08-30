import styles from "./Modal.module.css";
import { useRef } from "react";
import { MdClose as Close } from "react-icons/md";

const Modal = ({ children, showModal, onClose = null }) => {
  const modalContentRef = useRef(null);

  const closeModal = () => {
    onClose();
  };

  const handleClickModal = (e) => {
    if (!modalContentRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <div>
      {showModal && (
        <div
          className={`${styles.modalBackground} ${
            showModal ? styles.fadeIn : null
          }`}
          onClick={handleClickModal}
        >
          <div className={styles.modalContent} ref={modalContentRef}>
            {children}
          </div>
          <div className={styles.close}>
            <Close onClick={() => closeModal()} size={28} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
