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
import { useSelector } from "react-redux";

const Manager = () => {
  const { fetchUser } = useUserAction();
  const { fetchFiles , resetFilesState} = useFilesAction();
  const { isPremium } = useSelector((state) => state.user);

  useEffect(() => {
    fetchUser();
    fetchFiles();
    return ()=>{
      resetFilesState()
    }
  },[isPremium]);

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
        <Table isPremium={isPremium}/>
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
