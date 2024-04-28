const Messages = require('../models/messageModel');

module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await Messages.getMessages(from, to);

    res.json(messages);
  } catch (ex) {
    next(ex);
  }
};

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;

    await Messages.addMessage(from, to, message);

    res.json({ msg: 'Message added successfully.' });
  } catch (ex) {
    next(ex);
  }
};
