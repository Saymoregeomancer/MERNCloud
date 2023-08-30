import { Routes, Route } from "react-router-dom";
import routes from "../../../../config/routes.config.json";
import AppRoute from "./AppRoute";
import DynamicComponent from "../../../../utils/DynamicComponent";
import { useSelector } from "react-redux";
import {
  Manager,
  Settings,
  Authorization,
  SharedContent,
} from "../../../../view/pages";

// [
//   { "path": "/manager", "elements": "Manager" , "title":"Панель", "icon":"RxDashboard"},
//   { "path": "/trash", "elements": "Trash" , "title":"Смітник", "icon":"RxTrash"},
//   { "path": "/settings", "elements": "Settings" , "title":"Налаштування", "icon":"RxMixerVertical"}
// ]

const AppRouter = ({}) => {
  const { isAuth } = useSelector((state) => state.auth);
  // console.log(isAuth);
  if (!isAuth) {
    return (
      <Routes>
        <Route path="/*" element={<Authorization />} />
      </Routes>
    );
  }
  return (
    <Routes>
      {/* {routes.map((route) => {
        <AppRoute key={route.path} props={'qwe'} />;
      })} */}
      <Route
        exact
        path={"/manager"}
        element={<DynamicComponent component={Manager} />}
      />
      <Route exact path={"/settings"} element={<Settings />} />
      <Route exact path={"/auth"} element={<Authorization />} />
      <Route exact path={"/shared"} element={<SharedContent />} />
    </Routes>
  );
};

// const AppRouter = ({ isAuth }) => {
//   if (!isAuth) {
//     return (
//       <Routes>
//         <Route path="/*" element={<AuthPage />} />
//       </Routes>
//     );
//   }

//   return (
//     <>
//       <NavigationLayout />
//       <Routes>
//         <Route exact path="/transactions" element={<TransactionsPage />} />
//         <Route exact path="/reports" element={<ReportsPage />} />
//         <Route exact path="/settings" element={<SettingsPage />} />
//       </Routes>
//     </>
//   );
// };

export default AppRouter;
