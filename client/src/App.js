import "./App.module.scss";
import { NavigationsLayout } from "./view/layouts";
import React from "react";
import { useSelector } from "react-redux";
import { AppRouter, Navigation } from "./modules/navigation";

function App() {
  const { isAuth } = useSelector((state) => state.auth);

  return (
    <React.Fragment>
      <div id="modal-root"></div>
      <div className="flex justify-between  py-3 px-2 h-full">
        {isAuth && (
          <NavigationsLayout>
            <Navigation />
          </NavigationsLayout>
        )}
        <AppRouter isAuth={isAuth} />
      </div>
    </React.Fragment>
  );
}

export default App;
