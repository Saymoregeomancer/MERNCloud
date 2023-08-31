import fileReducer from "./store/slice/fileSlice";
import previewReducer from "./store/slice/previewSlice";
import Table from "./components/Table/Table";
import ViewSwitcher from "./components/ViewSwitcher/ViewSwitcher";
import FolderNavigation from "./components/FolderNavigation/FolderNavigation";
import CreateFolder from "./components/CreateFolder/CreateFolder";
import Preview from "./components/Preview/Preview";
import FavFilesList from "./components/FavFilesList/FavFilesList";
import DrugAndDrop from "./components/DrugAndDrop/DrugAndDrop";
import Search from "./components/Search/Search";
import { fetchPreview } from "./store/actions/previewActions";
import { fetchFiles, searchFiles } from "./store/actions/fileActions";
export {
  previewReducer ,
  fileReducer,
  Search,
  DrugAndDrop,
  FavFilesList,
  Preview,
  Table,
  ViewSwitcher,
  FolderNavigation,
  CreateFolder,
  fetchPreview,
  fetchFiles,
  searchFiles,
};
