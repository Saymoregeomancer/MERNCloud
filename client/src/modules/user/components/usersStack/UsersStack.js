import { Scroll, Input } from "../../../../view/ui";
import styles from "./UsersStack.module.css";

const UsersStack = ({}) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        <span className={styles.span}>Add new user:</span>
        <div className={styles.input}></div>
        <Input></Input>
      </div>
      <div className={styles.wrap}>
        <span className={styles.span}>Users list:</span>
        <div className={styles.users}>
          <Scroll>aasdddddd</Scroll>
        </div>
      </div>
    </div>
  );
};

export default UsersStack;
