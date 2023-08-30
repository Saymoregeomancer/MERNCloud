import styles from "./Navigation.module.css";
import routes from "../../../../config/routes.config.json";
import { useLocation, Link } from "react-router-dom";
import * as RxIcons from "react-icons/rx";
// import * as IoIcons from "react-icons/io";
import DynamicComponent from "../../../../utils/DynamicComponent";

const Navigation = ({}) => {
  const location = useLocation();

  return (
    <div className={styles.container}>
      {routes.map(({ path, title, icon }) => {
        return (
          <div key={path} className={location.pathname === path ? styles.active : null}>
            <Link to={path} className={styles.navWrap}>
              <DynamicComponent component={RxIcons[icon]} size={25} />
              <div className={styles.title}>{title}</div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Navigation;
