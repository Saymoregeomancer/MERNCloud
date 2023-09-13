import { BiSearchAlt } from "react-icons/bi";
import { useState } from "react";
import styles from "./Search.module.css";

import { useFilesAction } from "../../store/files/useFileActions";

const initialState = "";

const Search = ({}) => {
  const { searchFiles } = useFilesAction();
  const [value, setValue] = useState(initialState);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleSearch = () => {
    searchFiles(value);
    setValue(initialState);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); 
      handleSearch();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        <div onClick={handleSearch} className={styles.button}>
          <BiSearchAlt size={23} />
        </div>
        <div className={styles.inputWrap}>
          <input
            value={value}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            placeholder="Search file..."
            className={styles.input}
          ></input>
        </div>
      </div>
    </div>
  );
};

export default Search;
