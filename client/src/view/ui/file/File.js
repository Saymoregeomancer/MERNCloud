import {
  CiFileOn as FileIcon,
  CiVolumeHigh as Audio,
  CiVideoOn as Video,
  CiServer as Db,
  CiImageOn as Image,
  CiFolderOn as FolderIcon,
} from "react-icons/ci";
import { BiWindows as Program } from "react-icons/bi";
import { GrDocumentConfig as Config } from "react-icons/gr";
import {
  DiJavascript1 as Js,
  DiPhp as Php,
  DiPython as Python,
} from "react-icons/di";
import { GoNote as Word } from "react-icons/go";

import {
  BsFileEarmarkZip as Archive,
  BsTable as Table,
  BsFiletypeHtml as Html,
  BsFiletypeCss as Css,
  BsFileEarmarkPpt as Present,
  BsFiletypeJson as Json,
} from "react-icons/bs";

import styles from "./Folder.module.css";
import supportExtensions from "./suportedExtentions.json";

const iconMap = {
  Text: Text,
  Archive: Archive,
  Image: Image,
  Video: Video,
  Audio: Audio,
  Program: Program,
  Table: Table,
  Html: Html,
  Css: Css,
  Php: Php,
  Js: Js,
  Python: Python,
  Present: Present,
  Config: Config,
  Word: Word,
  Db: Db,
  Json: Json,
};

const File = ({ size, type = "folder" }) => {
  const IconComponent =
    iconMap[
      Object.keys(supportExtensions).find((objectKey) =>
        supportExtensions[objectKey].includes(type)
      )
    ];

  let element = <FileIcon size={size} className={styles.element} />;

  if (type === "folder") {
    element = <FolderIcon size={size} className={styles.element} />;
  }
  if (IconComponent) {
    element = <IconComponent size={size} className={styles.element} />;
  }

  return <div className={styles.container}>{element}</div>;
};

export default File;
