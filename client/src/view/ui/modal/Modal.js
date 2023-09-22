import styles from "./Modal.module.css";
import { useRef } from "react";
import { MdClose as Close } from "react-icons/md";
import { createPortal } from "react-dom";

const Modal = ({ children, showModal, onClose = null }) => {
  const modalContentRef = useRef(null);

  if (!showModal) {
    return;
  }

  const closeModal = () => {
    onClose();
  };

  const handleClickModal = (e) => {
    if (!modalContentRef.current.contains(e.target)) {
      onClose();
    }
  };

  return createPortal(
    <div>
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
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
