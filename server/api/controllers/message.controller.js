const asyncHandler = require("express-async-handler");
const Message = require("../../models/MessageModel");
const User = require("../../models/UserModel");
const Chat = require("../../models/ChatModel");
const ErrorRespond = require("../../helpers/ErrorRespond");

//@description     Get all Messages
//@route           GET /api/Message/:chatId
//@access          Protected
const allMessages = asyncHandler(async (req, res) => {
  try {
    const chatId = req.params.chatId;
    console.log(chatId, "chatId");
    if (!chatId) return ErrorRespond(res, 400, "Chat ID not found!");

    const chats = await Chat.find({ _id: chatId });
    if (!chats) return ErrorRespond(res, 404, "Chat doesn't exists!");

    //searching message model with chat ID, not with the message ID
    const messages = await Message.find({ chat: chatId })
      .populate("sender", "username profilePic email")
      .populate("chat");

    if (!messages) return ErrorRespond(res, 404, "Could not fetch Chat Data");

    res.status(200).send(messages);
  } catch (error) {
    return ErrorRespond(res, 400, error.message);
  }
});

//@description     Create New Message
//@route           POST /api/Message/
//@access          Protected
const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId)
    return ErrorRespond(res, 400, "Please provide content and chat ID both!");

  var newMessage = {
    sender: req.user.id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);

    message = await message.populate("sender", "username profilePic");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "username profilePic email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    res.json(message);
  } catch (error) {
    return ErrorRespond(res, 400, error.message);
  }
});

module.exports = { allMessages, sendMessage };
