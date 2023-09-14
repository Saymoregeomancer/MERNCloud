const fileService = require("../services/file.service");
const fileProcessor = require("../services/file.processor");
const fs = require("fs");
const User = require("../models/User");
const File = require("../models/File");
const SharedAccessLink = require("../models/SharedAccessLink");
const archiver = require("archiver");
const PathUtils = require("../utils/Path.ustils");
const getExtensionType = require("../utils/getExtensionType.utils");
const AccessLink = require("../utils/accessLink.utils");
class FileController {
  async createDir(req, res) {
    try {
      const { name, parent } = req.body;
      const userId = req.user.id;

      const parentFolder = parent
        ? await File.findOne({ user: userId, _id: parent })
        : null;
      const getPaths = PathUtils.getPaths(userId, parentFolder?.path, name);
      await fileService.createDir(getPaths.aboluteFilePath);
      await File.create({
        name,
        type: "folder",
        path: getPaths.defaultFilePath,
        parent: parentFolder ? parentFolder.id : userId,
        user: userId,
      });
      return res.status(200).json({ message: "File was created" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error });
    }
  }
  async getFiles(req, res) {
    try {
      const parent = req.query.parent === "null" ? null : req.query.parent;
      const userId = req.user.id;
      const parentFolder = await File.findOne({
        user: userId,
        _id: !parent ? userId : parent,
      });
      const files = await File.find({
        user: userId,
        parent: !parent ? userId : parent,
      }).sort({ name: 1 });
      const dirStack = files.filter((elem) => elem.type === "folder");
      const fileStack = files.filter((elem) => elem.type !== "folder");
      return res
        .status(200)
        .json({ files: [...dirStack, ...fileStack], parent: parentFolder });
    } catch (e) {
      console.error(e);
      return res.status(400).json({ message: e });
    }
  }

  async uploadFile(req, res) {
    try {
      if (!req.files || !req.files.file) {
        throw new Error("No file uploaded");
      }

      const file = req.files.file;
      const parent = req.body.parent === "null" ? null : req.body.parent;
      const userId = req.user.id;
      const fileName = req.body.name.replace(/ /g, "_");
      const fileType = fileName.split(".").pop();
      let parentFolderPath;

      if (parent != null) {
        const parentFolder = await File.findOne({
          user: userId,
          _id: parent,
        });
        parentFolderPath = parentFolder.path;
      }

      const user = await User.findOne({ _id: userId });
      if (user.usedSpace + file.size > user.diskSpace) {
        throw new Error("There no space on the disk");
      }
      user.usedSpace = user.usedSpace + file.size;

      const getPaths = PathUtils.getPaths(userId, parentFolderPath, fileName);

      await fileService.uploadFile(getPaths.aboluteFilePath, file);

      const accessLink = AccessLink.createAccessLink(
        userId,
        getPaths.defaultFilePath
      );

      const fileDB = new File({
        name: fileName,
        type: fileType,
        size: file.size,
        path: getPaths.defaultFilePath,
        parent: !parent ? userId : parent,
        user: user._id,
        accessLink: accessLink,
      });

      await fileDB.save();
      await user.save();

      return res.status(200).json({ message: "File Uploaded" });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: e });
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
      res.status(500).json({ message: e });
    }
  }

  async deleteFile(req, res) {
    try {
      const userId = req.user.id;
      const file = await File.findOne({
        _id: req.query.id,
        user: userId,
      });
      if (!file) {
        throw new Error("file not found");
      }
      let deleteFilesSize = 0;
      const parentPath = file.path;
      if (file.type !== "folder") {
        deleteFilesSize = file.size;
        await File.deleteOne({ _id: file._id });
      } else {
        const files = await File.find({
          path: { $regex: parentPath },
          user: req.user.id,
        });
        const filtedFiles = files.filter((file) =>
          PathUtils.checkPath(parentPath, file.path)
        );

        filtedFiles.forEach((file) => {
          deleteFilesSize = deleteFilesSize + file.size;
        });

        await File.deleteMany({
          _id: { $in: filtedFiles.map((doc) => doc._id) },
        });
      }

      fileService.deleteFile(PathUtils.getFilePath(userId, file.path), file);

      const user = await User.findOne({ _id: req.user.id });

      user.usedSpace = user.usedSpace - deleteFilesSize;

      if (user.usedSpace < 0) {
        user.usedSpace = 0;
      }

      await user.save();

      return res.json({ message: "File was deleted" });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: e });
    }
  }

  async select(req, res) {
    try {
      const userId = req.user.id;
      const fileId = req.query._id;
      let file = await File.findOne({ user: userId, _id: fileId });
      file.selected = !file.selected;
      await file.save();
      return res.status(200).json({ message: "Selected" });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: e });
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

      if (fileName) {
        fileQuery = Object.assign(fileQuery, {
          name: { $regex: fileName, $options: "i" },
        });
      }
      if (fileSelect) {
        fileQuery = Object.assign(fileQuery, { selected: fileSelect });
      }

      let files = await File.find(fileQuery);
      return res.status(200).json({ files: [...files] });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: e });
    }
  }

  async getPreview(req, res) {
    try {
      const fileId = req.query.id;
      const resize = req.query.resize === "true" ? true : false;
      const file = await File.findOne({ _id: fileId });

      const userId = file.user;

      if (!file) {
        return res.status(404).json({ message: "File not found" });
      }

      const filePath = PathUtils.getFilePath(userId, file.path);
      const previewType = getExtensionType(file.type);

      switch (previewType) {
        case "image": {
          const previewImage = await fileProcessor.processImage(
            filePath,
            resize
          );
          res.set("Content-Type", "image/jpeg");
          return res.send(previewImage);
        }
        case "audio": {
          const audioBuffer = fileProcessor.processAudio(filePath);
          res.set("Content-Type", "audio/mpeg");
          res.set("Content-Disposition", `attachment; filename="${file.name}"`);
          return res.send(audioBuffer);
        }
        case "video": {
          let preview;
          let bufferPath = PathUtils.getBufferFilePath();
          res.set("Content-Type", "video/mp4");

          preview = await fileProcessor.processVideo(
            filePath,
            bufferPath,
            resize
          );
          const videoStream = fs.createReadStream(preview);
          await videoStream.pipe(res);
          videoStream.on("end", async () => {
            fs.unlink(bufferPath, (err) => {
              if (err) {
                console.error("Помилка при видаленні файлу:", err);
              }
            });
          });
          break;
        }
        default: {
          res.status(200).json(file);
          break;
        }
      }
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: e });
    }
  }
  async shareFile(req, res) {
    try {
      const { accessLink, email } = req.body;

      const userToShareFile = await User.findOne({ email });

      if (!userToShareFile) {
        throw new Error("User not found");
      }

      await SharedAccessLink.findOneAndUpdate(
        { user: userToShareFile._id },
        { $push: { links: accessLink } },
        { upsert: true }
      );

      return res.status(200).json({ message: "The file has been sent" });
    } catch (e) {
      console.error(e);
      return res
        .status(500)
        .json({ message: e.message || "Internal server error" });
    }
  }
  async getSharedFiles(req, res) {
    try {
      const userId = req.user.id;

      const sharedNode = await SharedAccessLink.findOne({ user: userId });

      if (sharedNode?.links.length === 0) {
        return res.status(200).json({ files: [], parentFolder: null });
      }

      const filePromises = sharedNode.links.map(async (link) => {
        const file = await File.findOne({ accessLink: link });
        return file;
      });

      const files = await Promise.all(filePromises);
      const filesArray = files.filter((element) => element !== null);

      return res.status(200).json({ files: filesArray, parent: null });
    } catch (e) {
      console.error(e);
      return res
        .status(500)
        .json({ message: e.message || "Internal server error" });
    }
  }

  downloadSharedFile = async (req, res) => {
    try {
      const { accessLink, id: fileId } = req.query;
      const decryptLink = AccessLink.decryptAccessLink(accessLink);

      const newReq = {
        query: {
          id: fileId,
        },
        user: {
          id: decryptLink.userId,
        },
      };

      await this.downloadFile(newReq, res);
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e });
    }
  };
}

module.exports = new FileController();
