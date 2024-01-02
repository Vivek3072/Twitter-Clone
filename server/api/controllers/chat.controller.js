const asyncHandler = require("express-async-handler");
const Chat = require("../../models/ChatModel");
const User = require("../../models/UserModel");
const ErrorRespond = require("../../helpers/ErrorRespond");

//@description     Create or fetch One to One Chat
//@route           POST /api/chat/
//@access          Protected
const accessChat = asyncHandler(async (req, res) => {
  const { receiver_id } = req.body;

  if (!receiver_id)
    return ErrorRespond(res, 400, "ID param of receiver not found!");

  // Here we are searching if the chat exists, and if it does we add the users data in it with the latest message
  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user.id } } },
      { users: { $elemMatch: { $eq: receiver_id } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "receiver_id profilePic email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "One on One",
      isGroupChat: false,
      users: [req.user.id, receiver_id],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(FullChat);
    } catch (error) {
      return ErrorRespond(res, 400, error.message);
    }
  }
});

//@description     Fetch all chats for a user
//@route           GET /api/chat/
//@access          Protected
const fetchChats = asyncHandler(async (req, res) => {
  try {
    // In the Chat model finding all the chats where the user is a participant
    const chats = await Chat.find({
      users: { $elemMatch: { $eq: req.user.id } },
    })
      .populate("users", "-password -following -createdAt -updatedAt") // Populating the "users" field among all documents, excluding the password,following etc fields
      .populate("groupAdmin", "-password -following -createdAt -updatedAt") // Populating the "groupAdmin" field, excluding the password field
      .populate("latestMessage") // Populating the "latestMessage" field
      .sort({ updatedAt: -1 }); // Sorting the results based on the updatedAt field in descending order

    const results = await User.populate(chats, {
      path: "latestMessage.sender",
      select: "username profilePic email",
    });
    res.status(200).send(results);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Create New Group Chat
//@route           POST /api/chat/group
//@access          Protected
const createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.groupName)
    return ErrorRespond(res, 400, "Please fill all the feilds");

  // As we cannot directly send an array from the frontend, we will send it in JSON.stringify() format then we will parse it in our backend
  try {
    const userIds = JSON.parse(req.body.users);

    if (userIds.length < 2)
      return ErrorRespond(
        res,
        400,
        "More than 2 users are required to form a group chat"
      );

    userIds.push(req.user.id);

    const groupChat = await Chat.create({
      chatName: req.body.groupName,
      users: userIds,
      isGroupChat: true,
      groupAdmin: req.user.id,
    });
    if (!groupChat)
      return ErrorRespond(res, 400, "Cannot create a group chat!");
    // res.status(200).send(groupChat);

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password -following -createdAt -updatedAt")
      .populate("groupAdmin", "-password -following -createdAt -updatedAt");

    res.status(200).send(fullGroupChat);
  } catch (error) {
    return ErrorRespond(res, 400, error.message);
  }
});

// @desc    Rename Group
// @route   PUT /api/chat/rename
// @access  Protected
const renameGroup = asyncHandler(async (req, res) => {
  const { chatId, groupName } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName: groupName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) return ErrorRespond(res, 404, "Chat Not Found");

  res.status(200).json(updatedChat);
});

// @desc    Remove user from Group
// @route   PUT /api/chat/groupremove
// @access  Protected
const removeFromGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  // check if the requester is admin

  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) return ErrorRespond(res, 404, "Chat Not Found");

  res.status(200).json(removed);
});

// @desc    Add user to Group / Leave
// @route   PUT /api/chat/groupadd
// @access  Protected
const addToGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  // check if the requester is admin

  const added = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) return ErrorRespond(res, 404, "Chat Not Found");

  res.status(200).json(added);
});

module.exports = {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
};
