import * as pages from "../../../../view/pages";
import DynamicComponent from "../../../../utils/DynamicComponent";

import { Routes, Route } from "react-router-dom";

import { routes, routesAuth } from "../../../../config/routes.config";
import { Authorization, Page404 } from "../../../../view/pages";

const AppRouter = ({ isAuth }) => {
  if (!isAuth) {
    return (
      <Routes>
        {/* {routes.map(({ path, element }) => {
        if (!(element in pages)) {
          return;
        }
        return (
          <Route
            exact
            path={path}
            element={<DynamicComponent component={pages[element]} />}
          />
        );
      })} */}
        <Route path="/login" element={<Authorization />} />
        <Route path="/*" exact element={<Authorization />} />
      </Routes>
    );
  }
  return (
    <Routes>
      <Route path="/*" exact element={<Page404 />} />
      {routes.map(({ path, element }) => {
        if (!(element in pages)) {
          return;
        }
        return (
          <Route
            key={path}
            exact
            path={path}
            element={<DynamicComponent component={pages[element]} />}
          />
        );
      })}
    </Routes>
  );
};

export default AppRouter;
