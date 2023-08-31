import styles from "./CreateFolderForm.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFiles } from "../../../store/actions/fileActions";
import { Input, Button, Alert } from "../../../../../view/ui";
import { requestApiPost } from "../../../../../utils/api/request.api";

const CreateFolderForm = ({ onHide }) => {
  const dispatch = useDispatch();
  const { currentDir } = useSelector((state) => state.files);

  const [error, setError] = useState(null);
  const [name, setName] = useState("");

  const handleInputChange = (event) => {
    if (error) {
      setError(false);
    }
    setName(event.target.value);
  };

  const handleButtonClick = async () => {
    try {
      if (name === "") {
        setError("Empty input");
        return;
      }
      setError(false);
      const data = {
        name: name,
        type: "folder",
        parent: currentDir,
      };
      

      const response = await requestApiPost("files/createDir", data);
      setName("");
      dispatch(fetchFiles(currentDir === null ? null : currentDir._id));
      onHide();
    } catch (error) {
      setError(error.response.data.message);
      console.error(error);
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleButtonClick();
    }
  };
  return (
    <>
      <Input
        value={name}
        onChange={handleInputChange}
        placeholder="Folder name"
        error={error}
        onKeyDown={handleKeyDown}
      />
      <div className={styles.buttonWrap}>
        <Button onClick={handleButtonClick}>Create</Button>
      </div>
      <Alert message={error} />
    </>
  );
};

export default CreateFolderForm;
