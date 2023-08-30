const config = require("config");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

class PathUtils {
  getFilePath(userId,filePath) {
      return path.join(`${config.get("filePath")}\\${userId}\\${filePath}`);
    }
  getBufferFilePath() {
    const id = uuidv4();
    const bufferPath = config.get("bufferPath");
    const result = path.join(bufferPath, `${id}.mp4`);
      return result;
    }

  getPaths(userId, parentFolderPath, file) {
    console.log(parentFolderPath)
    const rootPath = `${config.get("filePath")}\\${userId}`;

    const defaultFilePath = `${parentFolderPath? parentFolderPath : ""}/${file}`;
    const aboluteFilePath = path.join(rootPath, defaultFilePath);

    const paths = {
      defaultFilePath: defaultFilePath,
      rootPath: rootPath,
      aboluteFilePath: aboluteFilePath,
    };

    return paths;
  }

  checkPath(path1, path2) {
    let arr1 = path1.split("/").slice(1);
    let arr2 = path2.split("/").slice(1);
  
    let filtred = arr1.filter((value, index) => {
      if (value === arr2[index]) {
        return arr2[index];
      }
    });
  
    if (arr1.length === filtred.length) {
      return true;
    }
  
    return false;
  }

}

module.exports = new PathUtils();
