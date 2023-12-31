const Router = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const router = new Router();
const authMiddleware = require("../middleware/auth.middleware");
const fileService = require("../services/file.service");
const File = require("../models/File");
const AccessLink = require("../models/SharedAccessLink");
const PathUtils = require('../utils/Path.ustils')
router.post(
  "/registration",
  [
    check("email", "Uncorrect email").isEmail(),
    check(
      "password",
      "Password must be longer than 3 and shorter than 12"
    ).isLength({ min: 3, max: 12 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Uncorrect request", errors });
      }
      const { email, password } = req.body;
      const candidate = await User.findOne({ email });
      if (candidate) {
        return res
          .status(400)
          .json({ message: `User with email ${email} already exist` });
      }
      const hashPassword = await bcrypt.hash(password, 8);
      const user = await new User({ email, password: hashPassword });
      await user.save();
      const pathUtils = PathUtils.createNewUserFolder(user.id)
     
      const accessLink = new AccessLink({ links : [], user: user.id });
      await accessLink.save()
      await fileService.createDir(pathUtils);
      res.json({ message: "User was created" });
    } catch (e) {
      console.log(e);
      res.send({ message: "Server error" });
    }
  }
);

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPassValid = bcrypt.compareSync(password, user.password);
    if (!isPassValid) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ id: user.id }, config.get("secretKey"), {
      expiresIn: "12h",
    });
    res.status(200).json({
      token,
    });

  } catch (e) {
    console.log("authError");
    res.send({ message: "Server error" });
  }
});

router.get("/getUser", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    return res.json({
      id: user.id,
      email: user.email,
      diskSpace: user.diskSpace,
      usedSpace: user.usedSpace,
      isPremium : user.isPremium
      // avatar: user.avatar,
    });
  } catch (e) {
    console.log(e);
    res.send({ message: "Server error" });
  }
});
router.post("/increasePlan", authMiddleware, async (req, res) => {
  try {

    const user = await User.findOne({ _id: req.user.id });

    let {space,period} = req.body

    if(+space > 100) {
      space = 100 
    }

    user.diskSpace = space * 1024 **3
    user.isPremium = true

    await user.save()

    return res.status(200).json({
      id: user.id,
      email: user.email,
      diskSpace: user.diskSpace,
      usedSpace: user.usedSpace,
      isPremium: true
      // avatar: user.avatar,
    });
  } catch (e) {
    console.log(e);
    res.send({ message: "Server error" });
  }
});
// router.get("/auth", authMiddleware, async (req, res) => {
//   try {
//     const user = await User.findOne({ _id: req.user.id });
//     const token = jwt.sign({ id: user.id }, config.get("secretKey"), {
//       expiresIn: "1h",
//     });
//     return res.json({
//       token,
//       user: {
//         id: user.id,
//         email: user.email,
//         diskSpace: user.diskSpace,
//         usedSpace: user.usedSpace,
//         avatar: user.avatar,
//       },
//     });
//   } catch (e) {
//     console.log(e);
//     res.send({ message: "Server error" });
//   }
// });

module.exports = router;
