import { NavigationsLayout, MainLayout, SideBarLayout } from "../../layouts";
import { Navigation } from "../../../modules/navigation";
import { ChangePlan, Profile, UserSettings } from "../../../modules/user";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../../modules/user/slice/userSlice";

const Settings = () => {
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
        <ChangePlan />
        {/* <UserSettings /> */}
      </MainLayout>
      <SideBarLayout>
        <Profile />
      </SideBarLayout>
    </>
  );
};

export default Settings;
