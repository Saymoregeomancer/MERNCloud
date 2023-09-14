const Router = require("express");
const router = new Router();
const authMiddleware = require("../middleware/auth.middleware");
const fileController = require("../controllers/fileController");

router.post("/createDir", authMiddleware, fileController.createDir);
router.get("/getFiles", authMiddleware, fileController.getFiles);
router.post("/upload", authMiddleware, fileController.uploadFile);
router.get("/download", authMiddleware, fileController.downloadFile);
router.delete("/delete", authMiddleware, fileController.deleteFile);
router.get("/select", authMiddleware, fileController.select);
router.get("/search", authMiddleware, fileController.search);
router.get("/preview",authMiddleware,  fileController.getPreview)
router.post("/share", authMiddleware, fileController.shareFile);
router.get("/getShared", authMiddleware, fileController.getSharedFiles);
router.get("/downloadShared", authMiddleware, fileController.downloadSharedFile);


module.exports = router;
