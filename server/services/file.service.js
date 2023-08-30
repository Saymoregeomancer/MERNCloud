const fs = require("fs");
const config = require("config");
const path = require("path");
const deleteFolderRecursive = require("./recursiveDelete");

class FileService {
  createDir(abslouteFilaPath) {
    return new Promise((resolve, reject) => {
      if (!fs.existsSync(abslouteFilaPath)) {
        fs.mkdirSync(abslouteFilaPath);
        resolve( "File was created" );
      } else {
        reject("File already exists");
      }
    });
  }

  uploadFile(abslouteFilaPath,file) {
    return new Promise((resolve, reject) => {
      try {
        if (fs.existsSync(abslouteFilaPath)) {
          reject("File already exists");
        }

        file.mv(abslouteFilaPath);

        resolve({ message: "File was created" });
      } catch (e) {
         reject(e);
      }
    });
  }

  deleteFile(file) {
    const filePath = this.getPath(file);
    if (file.type === "dir" || file.type === "folder") {
      deleteFolderRecursive(filePath);
    } else {
      fs.unlinkSync(filePath);
    }
    return filePath;
  }

  getPath(file) {
    return path.join(`${config.get("filePath")}\\${file.user}\\${file.path}`);
  }
}

module.exports = new FileService();
