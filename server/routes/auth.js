const {
  login,
  register,
  getAllOnlineUsers,
  getAllUsers,
  setAvatar,
  logOut,
  UpdateUser
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);
router.get("/allonlineusers/:id", getAllOnlineUsers);
router.get("/allusers/:id", getAllUsers);
router.post("/setavatar/:id", setAvatar);
router.get("/logout/:id", logOut);
router.post("/updateuser/:id", UpdateUser)

module.exports = router;
