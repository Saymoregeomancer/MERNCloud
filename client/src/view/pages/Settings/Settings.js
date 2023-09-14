import { MainLayout, SideBarLayout } from "../../layouts";
import { ChangePlan, Profile, UserSettings } from "../../../modules/user";

import { useEffect } from "react";
import { useUserAction } from "../../../modules/user";

const Settings = () => {
  const { fetchUser } = useUserAction();

  useEffect(() => {
    fetchUser();
  });

  return (
    <>
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
