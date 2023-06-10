const User = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    delete user.password;
    //修改登录在线信息
    await User.findOneAndUpdate(
      {
        username: username
      },
      {
        online: true,
      },
      { new: true }
    );
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

//获取所有在线用户信息
module.exports.getAllOnlineUsers = async (req, res, next) => {
  try {
    //查询不为自身用户且在线上的其他用户
    const users = await User.find({ _id: { $ne: req.params.id }, online: true }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
      "isAvatarImageSet",
      "online",
      "brief"
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

//获取所有用户信息
module.exports.getAllUsers = async (req, res, next) => {
  try {
    //查询不为自身的用户
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
      "isAvatarImageSet",
      "online",
      "brief"
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

//设置头像
module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
};

//登出
module.exports.logOut = async (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
    onlineUsers.delete(req.params.id);
    //更新用户登出
    await User.findByIdAndUpdate(
      req.params.id,
      {
        online: false,
      },
      { new: true }
    );
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};

//修改用户信息
module.exports.UpdateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const email = req.body.email;
    const brief = req.body.brief;
    console.log(email, brief)
    const user = await User.findByIdAndUpdate(
      userId,
      {
        email,
        brief
      },
      { new: true }
    ).select([
      "email",
      "username",
      "avatarImage",
      "_id",
      "isAvatarImageSet",
      "online",
      "brief"
    ])
    return res.json(user);
  } catch (ex) {
    next(ex);
  }
}