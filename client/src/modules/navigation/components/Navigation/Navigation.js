import styles from "./Navigation.module.css";
import {routes} from "../../../../config/routes.config";
import { useLocation, Link } from "react-router-dom";
import * as RxIcons from "react-icons/rx";
import DynamicComponent from "../../../../utils/DynamicComponent";
import React, { useState, useRef, useEffect } from "react";

const Navigation = () => {
  const location = useLocation();
  const btnsRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [activeBlock, setActiveBlock] = useState({
    x: 0,
    y: 0,
    height: 0,
    width: 0,
  });

  useEffect(() => {
    let index = routes.map((route) => route.path).indexOf(location.pathname);
    setActiveIndex(index);
    let element = btnsRef.current?.childNodes[index];
    setActiveBlock({
      x: element?.offsetTop,
      y: element?.offsetLeft,
      height: element?.clientHeight,
      width: element?.clientWidth,
    });
  }, [location]);

  return (
    <>
      <div ref={btnsRef} className={styles.container}>
        {routes.map(({ path, title, icon }, index) => {
          return (
            <ComponentLink
              key={path}
              path={path}
              title={title}
              icon={icon}
              isActive={activeIndex === index}
            />
          );
        })}
      </div>
      <div
        className={styles.activeWrap}
        style={{
          position: "fixed",
          top: `${activeBlock.x}px`,
          left: `${activeBlock.y}px`,
        }}
      >
        <div
          className={styles.active}
          style={{
            height: `${activeBlock.height}px`,
            width: `${activeBlock.width}px`,
          }}
        ></div>
      </div>
    </>
  );
};

export default Navigation;

const ComponentLink = ({ path, title, icon, isActive = false }) => {
  return (
    <Link to={path} className={styles.navWrap}>
      <DynamicComponent
        className={`${styles.title} ${isActive ? styles.activeLink : ""}`}
        component={RxIcons[icon]}
        size={25}
      />
      <div className={`${styles.title} ${isActive ? styles.activeLink : ""}`}>
        {title}
      </div>
    </Link>
  );
};
