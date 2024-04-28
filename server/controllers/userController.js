const User = require('../models/userModel');

module.exports.login = async (req, res, next) => {
  try {
    console.log(`Trying to login`);
    const { username, password } = req.body;
    const user = await User.loginUser(username, password);
    if (!user) {
      return res.json({ msg: 'Incorrect Username or Password', status: false });
    }
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const result = await User.registerUser(username, email, password);
    return res.json(result);
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const users = await User.getAllUsers(userId);
   //return res.json({ msg: "Get users Successful" });
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    console.log(`Set avatar: ${userId}`)
    const avatarImage = req.body.image;
    const result = await User.setAvatar(userId, avatarImage);
    return res.json(result);
  } catch (ex) {
    next(ex);
  }
};

module.exports.logOut = async (req, res, next) => {
  try {
    console.log(`Logout`)
    if (!req.params.id) return res.json({ msg: "User id is required " });
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
    // Implementation for logging out, if necessary
  } catch (ex) {
    next(ex);
  }
};
