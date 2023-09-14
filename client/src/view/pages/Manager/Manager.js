import { MainLayout, Menu, SideBarLayout } from "../../layouts";
import { Profile, useUserAction } from "../../../modules/user";
import {
  Search,
  DrugAndDrop,
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
        <Table />
      </MainLayout>
      <SideBarLayout>
        <Profile />
        <Preview />
        <DrugAndDrop />
      </SideBarLayout>
    </>
  );
};

export default Manager;
