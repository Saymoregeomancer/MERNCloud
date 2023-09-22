import { Modal, Input, Button } from "../../../../../view/ui";
import { useState } from "react";

const FileShareModal = ({ showModal, onClose, handleShare }) => {
  const [value, setValue] = useState(null);
  const [erorr, setError] = useState(null);

  const handleChange = (e) => {
    setError(null);
    setValue(e.target.value);
  };

  const handleButton = () => {
    if (!value) {
      setError(true);
      return;
    }
    handleShare(value);
    onClose();
  };

  return (
    showModal && (
      <Modal showModal={showModal} onClose={onClose}>
        <div className="flex flex-col w-full h-full justify-center items-center">
          <div className="text-white">
            <Input
              placeholder="Write email to share"
              value={value}
              error={erorr}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className=" w-32 mt-3 text-purpleButton">
            <Button onClick={handleButton}>Share file</Button>
          </div>
        </div>
      </Modal>
    )
  );
};

export default FileShareModal;
