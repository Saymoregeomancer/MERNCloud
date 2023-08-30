const sharp = require("sharp");
const fs = require("fs");
const ffmpeg = require("fluent-ffmpeg");
const config = require("config");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const deleteFolderRecursive = require("../utils/recursiveDelete");

class FileProcessor {
  async processImage(filePath, { resize }) {
    try {
      if (resize === "true") {
        return await sharp(filePath).resize(150, 150).toBuffer();
      } else if (resize === "false") {
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

  // async processVideo(filePath, resize) {
  //   try {
  //     const metadata = await new Promise((resolve, reject) => {
  //       ffmpeg.ffprobe(filePath, (err, metadata) => {
  //         if (err) {
  //           reject(`Error to get video ${err.message}`);
  //           return;
  //         }
  //         resolve(metadata);
  //       });
  //     });

  //     const numberOfScreenshots = 7;
  //     const durationSeconds = metadata.format.duration;
  //     const intervalSeconds = Math.floor(durationSeconds / numberOfScreenshots);

  //     const id = uuidv4();
  //     const outputFolderPath = path.join(config.get("bufferPath"), id);

  //     const screenshotsPromises = [];

  //     for (let i = 1; i <= numberOfScreenshots; i++) {
  //       const screenshotTime = i * intervalSeconds;
  //       const screenshotFilename = `screenshot_${i}.png`;
  //       const screenshotFilePath = path.join(
  //         outputFolderPath,
  //         screenshotFilename
  //       );

  //       const screenshotPromise = await new Promise((resolve, reject) => {
  //         ffmpeg(filePath)
  //           .screenshots({
  //             timestamps: [screenshotTime],
  //             filename: screenshotFilename,
  //             folder: outputFolderPath,
  //           })
  //           .on("end", () => {
  //             resolve(screenshotFilePath);
  //           })
  //           .on("error", (err) => {
  //             console.error(`Screenshot  ${i} error: ${err.message}`);
  //             reject(err);
  //           });
  //       });

  //       screenshotsPromises.push(screenshotPromise);
  //     }

  //     const screenshotFilePaths = await Promise.all(screenshotsPromises);

  //     return screenshotFilePaths;
  //   } catch (err) {
  //     throw new Error(`Video error: ${err}`);
  //   }
  // }

  async processVideo(filePath, resize) {
    try {
      if (resize) {
        const id = uuidv4();
        const bufferPath = config.get("bufferPath");
        const responsePath = path.join(bufferPath, `${id}.mp4`);

        await new Promise((resolve, reject) => {
          ffmpeg(filePath)
            .size("150x150")
            .output(responsePath)
            .on("end", resolve)
            .on("error", reject)
            .run();
        });

        return responsePath;
      } else {

        const id = uuidv4();
        const bufferPath = config.get("bufferPath");
        const responsePath = path.join(bufferPath, `${id}.mp4`);

        await new Promise((resolve, reject) => {
          ffmpeg(filePath)
            .output(responsePath)
            .on("end", resolve)
            .on("error", reject)
            .run();
        });

        return responsePath;
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
