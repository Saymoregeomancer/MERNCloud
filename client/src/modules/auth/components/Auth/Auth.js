import styles from "./Auth.module.css";

import {
  setCursorWait,
  setCursorDefault,
} from "../../../../utils/cursorChanger";
import { Input, Button, Alert } from "../../../../view/ui";

import { useAuthActions } from "../../store/useAuthActions";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const initState = {
  email: "",
  password: "",
};

const Auth = ({}) => {
  const { error } = useSelector((state) => state.auth);

  const { login, registration } = useAuthActions();
  const navigate = useNavigate();
  const [authData, setAuthData] = useState(initState);
  const [message, setMessage] = useState(null);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAuthData((prev) => ({ ...prev, [name]: value }));
  };

  const onLoginHandler = async () => {
    setCursorWait();
    const response = await login({ ...authData });
    if ("error" in response) {
      return;
    }

    navigate("/manager");
    setCursorDefault();
  };
  const onRegisterHandler = async () => {
    setCursorWait();
    const response = await registration({ ...authData });
    if ("error" in response) {
      return;
    }
    setMessage(response.payload.message);
    setCursorDefault();
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

      {/* <span className={styles.titleWrap}>grac</span> */}
      <Alert message={error || message} type={message ? "success" : null} />
    </div>
  );
};

export default Auth;
