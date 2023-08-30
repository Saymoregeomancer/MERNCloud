import { NavigationsLayout, MainLayout, SideBarLayout } from "../../layouts";
import { Navigation } from "../../../modules/navigation";
import {
  ChangePlan,
  Profile,
  UserSettings,
  UsersStack,
} from "../../../modules/user";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../../modules/user/slice/userSlice";

const SharedContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  });

  return (
    <>
      <NavigationsLayout>
        <Navigation />
      </NavigationsLayout>

      <MainLayout>
        {/* <ChangePlan />
        <UserSettings /> */}
         <div className="flex items-center h-full w-full justify-center">
          <span>Comming soon....</span>
        </div>
      </MainLayout>
      <SideBarLayout>
        <Profile />
        {/* <UsersStack /> */}
      </SideBarLayout>
    </>
  );
};

export default SharedContent;
