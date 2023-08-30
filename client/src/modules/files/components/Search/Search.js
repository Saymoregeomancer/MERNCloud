import { BiSearchAlt } from "react-icons/bi";
import { useState } from "react";
import styles from "./Search.module.css";

import { useDispatch } from "react-redux";
import { searchFiles } from "../../store/actions/fileActions";

const initialState = "";

const Search = ({}) => {
  const [value, setValue] = useState(initialState);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleSearch = () => {
    dispatch(searchFiles(value));
    setValue(initialState);
  };

  const  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Зупинити діяння за замовчуванням (наприклад, відправку форми)
      
      // Викликати функцію або виконати потрібні дії
      handleSearch();
    }
  }



  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        <div 
        onClick={handleSearch} 
        className={styles.button}>
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
