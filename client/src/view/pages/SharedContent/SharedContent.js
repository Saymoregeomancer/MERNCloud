import { MainLayout, SideBarLayout, Menu } from "../../layouts";
import {
  ChangePlan,
  Profile,
  UserSettings,
  UsersStack,
} from "../../../modules/user";
import { Table, ViewSwitcher, Preview } from "../../../modules/files";
import TableSkeleton from "./parts/TableSkeleton";

import { useSelector } from "react-redux";
import { useEffect } from "react";

import { useUserAction } from "../../../modules/user";
import { useFilesAction } from "../../../modules/files";

const SharedContent = () => {
  const { fetchUser } = useUserAction();
  const { fetchSharedFiles, resetFilesState } = useFilesAction();
  const { isPremium } = useSelector((state) => state.user);
  useEffect(() => {
    fetchUser();
    fetchSharedFiles();
    return () => {
      resetFilesState();
    };
  }, [isPremium]);

  return (
    <>
      <MainLayout>
        {/* <ChangePlan />
        <UserSettings /> */}
        <Menu right={<ViewSwitcher />} />
        {isPremium ? (
          <Table isShared={true} isPremium={isPremium} />
        ) : (
          <TableSkeleton />
        )}
      </MainLayout>
      <SideBarLayout>
        <Profile />
        {/* <UsersStack /> */}
        <Preview />
      </SideBarLayout>
    </>
  );
};

export default SharedContent;
