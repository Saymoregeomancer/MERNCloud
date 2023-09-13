import {
  NavigationsLayout,
  MainLayout,
  Menu,
  SideBarLayout,
} from "../../layouts";
import { Navigation } from "../../../modules/navigation";
import { Profile } from "../../../modules/user";
import {
  Search,
  DrugAndDrop,
  FavFilesList,
  Preview,
  Table,
  ViewSwitcher,
  FolderNavigation,
  CreateFolder,
} from "../../../modules/files";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchFiles } from "../../../modules/files/store/files/fileActions";
import { fetchUser } from "../../../modules/user/slice/userSlice";

import { useFilesAction } from "../../../modules/files/store/files/useFileActions";

const Manager = () => {

  const {fetchFiles}= useFilesAction()

  // console.log(useFilesAction())
  const dispatch = useDispatch(); 

  useEffect(() => {
    fetchFiles()
    // dispatch(fetchFiles());
    dispatch(fetchUser());
  });

  return (
    <>
      <NavigationsLayout>
        <Navigation />
      </NavigationsLayout>

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
