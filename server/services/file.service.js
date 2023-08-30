const fs = require("fs");
const config = require("config");
const path = require("path");
const deleteFolderRecursive = require("../utils/recursiveDelete");

class FileService {
  createDir(abslouteFilePath) {
    return new Promise((resolve, reject) => {
      if (!fs.existsSync(abslouteFilePath)) {
        fs.mkdirSync(abslouteFilePath);
        resolve("File was created");
      } else {
        reject("File already exists");
      }
    });
  }

  uploadFile(abslouteFilePath, file) {
    return new Promise((resolve, reject) => {
      try {
        if (fs.existsSync(abslouteFilePath)) {
          reject("File already exists");
        }

        file.mv(abslouteFilePath);

        resolve({ message: "File was created" });
      } catch (e) {
        reject(e);
      }
    });
  }

  deleteFile(abslouteFilePath, file) {
    const filepath = path.join(abslouteFilePath , '')
    if (file.type === "dir" || file.type === "folder") {
      deleteFolderRecursive(filepath);
    } else {
      fs.unlinkSync(filepath);
    }
  }

  getPath(file) {
    return path.join(`${config.get("filePath")}\\${file.user}\\${file.path}`);
  }
}

module.exports = new FileService();
