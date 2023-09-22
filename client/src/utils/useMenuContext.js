import { useState, useRef, useEffect } from "react";

const useMenuContext = () => {
  const [show, setShow] = useState(false);
  const btnRef = useRef(null);
  const menuRef = useRef(null);


  useEffect(() => {
    const handleClickOutside = (event) => {
   
        if (
            menuRef.current &&
            !menuRef.current.contains(event.target) &&
            !btnRef.current.contains(event.target)
          ) {
            setShow(false);
          }
        }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const handleBtnClick = () => {
    setShow(!show);
  };

  return { show, btnRef , menuRef, handleBtnClick };
};

export default useMenuContext;
