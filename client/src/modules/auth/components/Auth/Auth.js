import styles from "./Auth.module.css";

import { Input, Button } from "../../../../view/ui";
import { login, registration } from "../../actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const initState = {
  email: "",
  password: "",
};

const Auth = ({}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [authData, setAuthData] = useState(initState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAuthData((prev) => ({ ...prev, [name]: value }));
  };

  const onLoginHandler = () => {
    dispatch(login({ ...authData }));
    navigate("/manager");
  };
  const onRegisterHandler = () => {
    dispatch(registration({ ...authData }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputWrap}>
        <Input
          placeholder="Email"
          name="email"
          value={authData.email}
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.inputWrap}>
        <Input
          placeholder="Password"
          name="password"
          onChange={handleInputChange}
          value={authData.password}
        />
      </div>
      <div className={styles.buttonsGroup}>
        <Button contained onClick={onLoginHandler}>
          Log in
        </Button>
        <Button onClick={onRegisterHandler}>Sin up</Button>
      </div>

      <span className={styles.titleWrap}>grac</span>
    </div>
  );
};

export default Auth;
