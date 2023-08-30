const fs = require("fs");
const config = require("config");
const path = require("path");
const deleteFolderRecursive = require("./recursiveDelete");

class FileService {
  createDir(newFolderPath, userId) {
    return new Promise((resolve, reject) => {
      const mainPath = `${config.get("filePath")}\\${userId}`;
      const filePath = path.join(mainPath, newFolderPath);
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath);
        resolve({ message: "File was created" });
      } else {
        reject("File already exists");
      }
    });
  }

  uploadFile(parentFolderPath, newFile, userId, fileName) {
    return new Promise((resolve, reject) => {
      try {
        const parentFolderFullPath =
          parentFolderPath === "/"
            ? `${config.get("filePath")}\\${userId}\\${fileName}`
            : `${config.get(
                "filePath"
              )}\\${userId}\\${parentFolderPath}\\${fileName}`;

        const filePath = path.join(parentFolderFullPath, "");

        if (fs.existsSync(parentFolderFullPath)) {
          reject("File already exists");
        }

        newFile.mv(parentFolderFullPath);

        return resolve({ message: "File was created" });
      } catch (e) {
        return reject(e);
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
