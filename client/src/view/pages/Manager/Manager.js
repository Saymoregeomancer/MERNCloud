import { MainLayout, Menu, SideBarLayout } from "../../layouts";
import { Profile, useUserAction } from "../../../modules/user";
import {
  Search,
  DragAndDrop,
  FavFilesList,
  Preview,
  Table,
  ViewSwitcher,
  FolderNavigation,
  CreateFolder,
  useFilesAction,
} from "../../../modules/files";

import { useEffect } from "react";

const Manager = () => {
  const { fetchUser } = useUserAction();
  const { fetchFiles } = useFilesAction();

  useEffect(() => {
    fetchFiles();
    fetchUser();
  });

  return (
    <>
      <MainLayout>
        <Search />
        <Menu
          left={
            <>
              <FolderNavigation />
            </>
          }
          right={
            <>
              <CreateFolder />
              <ViewSwitcher />
            </>
          }
        />
        <FavFilesList />
        <Table isPremium={true}/>
      </MainLayout>
      <SideBarLayout>
        <Profile />
        <Preview />
        <DragAndDrop />
      </SideBarLayout>
    </>
  );
};

export default Manager;
