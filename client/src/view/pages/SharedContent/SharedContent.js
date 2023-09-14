import { MainLayout, SideBarLayout , Menu} from "../../layouts";
import {
  ChangePlan,
  Profile,
  UserSettings,
  UsersStack,
} from "../../../modules/user";
import { Table , ViewSwitcher , Preview } from "../../../modules/files";

import { useEffect } from "react";

import { useUserAction } from "../../../modules/user";
import { useFilesAction } from "../../../modules/files";

const SharedContent = () => {
  const { fetchUser } = useUserAction();
  const {fetchSharedFiles} = useFilesAction()

  useEffect(() => {
    fetchUser();
    fetchSharedFiles({isShared : true})
  });

  return (
    <>
      <MainLayout>
        {/* <ChangePlan />
        <UserSettings /> */}
        <Menu right={<ViewSwitcher/>}/>
        <Table isShared={true} />
      </MainLayout>
      <SideBarLayout>
        <Profile />
        {/* <UsersStack /> */}
        <Preview/>
      </SideBarLayout>
    </>
  );
};

export default SharedContent;
