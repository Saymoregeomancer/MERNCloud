const fileService = require("../services/file.service");
const fileProcessor = require("../services/file.processor");
const config = require("config");
const fs = require("fs");
const User = require("../models/User");
const File = require("../models/File");
const path = require("path");
const archiver = require("archiver");
const checkPath = require("../services/checkPath.utils");

class FileController {
  async createDir(req, res) {
    try {
      const { name, parent } = req.body;
      const user = req.user;
      const parentFolder = parent
        ? await File.findOne({ user: user.id, _id: parent })
        : null;
      const newFolderPath = `${parentFolder?.path ?? ""}/${name}`;
      await fileService.createDir(newFolderPath, user.id);
      await File.create({
        name,
        type: "folder",
        path: newFolderPath,
        parent: parentFolder ? parentFolder.id : user.id,
        user: user.id,
      });
      return res.status(200).json({ message: "File was created" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error });
    }
  }
  async getFiles(req, res) {
    try {
      const { parent } = req.query;
      const user = req.user.id;
      const parentFolderQuery = {
        user,
        _id: parent === "null" ? user : parent,
      };
      const parentFolder = await File.findOne(parentFolderQuery);
      const files = await File.find({
        user,
        parent: parent === "null" ? user : parent,
      }).sort({ name: 1 });
      const dirStack = files.filter((elem) => elem.type === "folder");
      const fileStack = files.filter((elem) => elem.type !== "folder");
      return res
        .status(200)
        .json({ files: [...dirStack, ...fileStack], parent: parentFolder });
    } catch (e) {
      console.error(e);
      return res.status(400).json(e);
    }
  }

  async uploadFile(req, res) {
    try {
      if (!req.files || !req.files.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const file = req.files.file;
      const { parent } = req.body;
      const userId = req.user.id;
      let parentFolderPath = "/";

      const parentConst = parent === "null" ? null : parent;

      if (parentConst != null) {
        const parentFolder = await File.findOne({
          user: userId,
          _id: parent,
        });
        parentFolderPath = parentFolder.path;
      }

      const user = await User.findOne({ _id: userId });
      if (user.usedSpace + file.size > user.diskSpace) {
        return res.status(400).json({ message: "There no space on the disk" });
      }
      user.usedSpace = user.usedSpace + file.size;
      const fileName = req.body.name.replace(/ /g, "_");

      const mvFile = await fileService.uploadFile(
        parentFolderPath,
        file,
        user.id,
        fileName
      );

      const fileType = fileName.split(".").pop();
      const filePath = `${
        parentFolderPath === "/" ? "" : parentFolderPath
      }/${fileName}`;

      const newFileParent = parentConst == null ? userId : parent;

      const fileDB = new File({
        name: fileName,
        type: fileType,
        size: file.size,
        path: filePath,
        parent: newFileParent,
        user: user._id,
      });

      await fileDB.save();
      await user.save();

      return res.status(200).json({ message: "File Uploaded" });
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  }

  async downloadFile(req, res) {
    try {
      const file = await File.findOne({ _id: req.query.id, user: req.user.id });
      const path = fileService.getPath(file);

      if (fs.existsSync(path)) {
        if (fs.lstatSync(path).isDirectory()) {
          const output = fs.createWriteStream("archive.zip");
          const archive = archiver("zip", { zlib: { level: 9 } });

          output.on("close", () => {
            res.download("archive.zip", "archive.zip", () => {
              fs.unlinkSync("archive.zip");
            });
          });

          archive.pipe(output);
          archive.directory(path, false);
          archive.finalize();
        } else {
          return res.download(path, file.name);
        }
      } else {
        return res.status(400).json({ message: "File not found" });
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Download error" });
    }
  }

  async deleteFile(req, res) {
    try {
      const file = await File.findOne({
        _id: req.query.id,
        user: req.user.id,
      });
      if (!file) {
        return res.status(400).json({ message: "file not found" });
      }
      const parentPath = file.path;

      const files = await File.find({
        path: { $regex: parentPath },
        user: req.user.id,
      });

      const filtedFiles = files.filter((file) =>
        checkPath(parentPath, file.path)
      );

      let deleteFilesSize = 0;

      filtedFiles.forEach((file) => {
        deleteFilesSize = deleteFilesSize + file.size;
      });

      await File.deleteMany({
        _id: { $in: filtedFiles.map((doc) => doc._id) },
      });

      fileService.deleteFile(file);

      const user = await User.findOne({ _id: req.user.id });

      user.usedSpace = user.usedSpace - deleteFilesSize;

      if (user.usedSpace < 0) {
        user.usedSpace = 0;
      }

      await user.save();

      return res.json({ message: "File was deleted" });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "Dir is not empty" });
    }
  }

  async select(req, res) {
    try {
      const userId = req.user.id;
      const fileId = req.query._id;
      let file = await File.findOne({ user: userId, _id: fileId });
      file.selected = !file.selected;
      await file.save();
      return res.status(200).json("Selected");
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "Server error" });
    }
  }
  async search(req, res) {
    try {
      const userId = req.user.id;

      const fileName = req.query?.name;
      const fileSelect = req.query?.select;

      let fileQuery = {
        user: userId,
      };

      if (fileName !== undefined) {
        fileQuery = Object.assign(fileQuery, {
          name: { $regex: fileName, $options: "i" },
        });
      }
      if (fileSelect !== undefined) {
        fileQuery = Object.assign(fileQuery, { selected: fileSelect });
      }

      let files = await File.find(fileQuery);
      return res.status(200).json({ files: [...files] });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "Server error" });
    }
  }

  async getPreview(req, res) {
    try {
      const fileId = req.query.id;
      const resize = req.query?.resize;
      const file = await File.findOne({ _id: fileId, user: req.user.id });
      const supportedImg = config.get("supportedImageExtensions");
      const supportedAudio = config.get("supportedAudioExtensions");
      const supportedVideo = config.get("supportedVideoExtensions");

      if (!file) {
        return res.status(404).json({ message: "File not found" });
      }

      const filePath = fileService.getPath(file);
      const fileExtension = path.extname(file.name).toLowerCase();
      console.log(supportedAudio.includes(fileExtension));

      if (supportedImg.includes(fileExtension)) {
        const previewImage = await fileProcessor.processImage(filePath, {
          resize: resize,
        });
        res.set("Content-Type", "image/jpeg");
        return res.send(previewImage);
      } else if (supportedAudio.includes(fileExtension)) {
        const audioBuffer = fileProcessor.processAudio(filePath);
        res.set("Content-Type", "audio/mpeg");
        res.set("Content-Disposition", `attachment; filename="${file.name}"`);
        return res.send(audioBuffer);
      } else if (supportedVideo.includes(fileExtension)) {
        let preview;
        res.set("Content-Type", "video/mp4");
        preview = await fileProcessor.processVideo(filePath, resize === "true");
        const videoStream = fs.createReadStream(preview);
        await videoStream.pipe(res);

        videoStream.on("end", async () => {
          fs.unlink(preview, (err) => {
            if (err) {
              console.error("Помилка при видаленні файлу:", err);
            }
          });
        });
      } else {
        res.status(200).json(file);
      }
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Server error" });
    }
  }

  // async uploadAvatar(req, res) {
  //   try {
  //     const file = req.files.file;
  //     const user = await User.findById(req.user.id);
  //     const avatarName = Uuid.v4() + ".jpg";
  //     file.mv(config.get("staticPath") + "\\" + avatarName);
  //     user.avatar = avatarName;
  //     await user.save();
  //     return res.json(user);
  //   } catch (e) {
  //     console.log(e);
  //     return res.status(400).json({ message: "Upload avatar error" });
  //   }
  // }

  // async deleteAvatar(req, res) {
  //   try {
  //     const user = await User.findById(req.user.id);
  //     fs.unlinkSync(config.get("staticPath") + "\\" + user.avatar);
  //     user.avatar = null;
  //     await user.save();
  //     return res.json(user);
  //   } catch (e) {
  //     console.log(e);
  //     return res.status(400).json({ message: "Delete avatar error" });
  //   }
  // }
}

module.exports = new FileController();
