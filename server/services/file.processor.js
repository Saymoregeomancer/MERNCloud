const sharp = require("sharp");
const fs = require("fs");
const ffmpeg = require("fluent-ffmpeg");
const config = require("config");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const deleteFolderRecursive = require("../utils/recursiveDelete");

class FileProcessor {
  async processImage(filePath, resize) {
    try {
      if (resize) {
        return await sharp(filePath).resize(150, 150).toBuffer();
      } else {
        return await sharp(filePath).toBuffer();
      }
    } catch (e) {
      console.log(e);
      throw new Error("Image processing error");
    }
  }

  processAudio(filePath) {
    try {
      return fs.readFileSync(filePath);
    } catch (e) {
      console.log(e);
      throw new Error("Audio processing error");
    }
  }

  

  async processVideo(filePath, bufferPath, resize) {
    try {
      if (resize) {
        await new Promise((resolve, reject) => {
          ffmpeg(filePath)
            .size("150x150")
            .output(bufferPath)
            .on("end", resolve)
            .on("error", reject)
            .run();
        });

        return bufferPath;
      } else {
        await new Promise((resolve, reject) => {
          ffmpeg(filePath)
            .output(bufferPath)
            .on("end", resolve)
            .on("error", reject)
            .run();
        });

        return bufferPath;
      }
    } catch (err) {
      throw new Error(`Video processing error: ${err.message}`);
    }
  }

  async clearBuffer(bufferFilesPath) {
    let folderFilesArr = bufferFilesPath[0].split("\\");
    let folderPath = folderFilesArr.slice(0, -1);
    deleteFolderRecursive(path.join(`${folderPath.join("\\")}`, ""));
  }
}
module.exports = new FileProcessor();
