import "./App.module.scss";
import {
  NavigationsLayout,
  MainLayout,
  SideBarLayout,
  Menu,
} from "./view/layouts";
import { AppRouter, Navigation } from "./modules/navigation";

function App() {

  return (
    <div className="flex justify-between  py-3 px-2 h-full">
      <AppRouter>
        asdas
        <NavigationsLayout>
          <Navigation />
        </NavigationsLayout>
        asdasd
      </AppRouter>
    </div>
  );
}

export default App;
