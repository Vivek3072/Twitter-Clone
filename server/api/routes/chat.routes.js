const validateToken = require("../../middlewares/ValidateToken");

const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup,
} = require("../controllers/chat.controller");

const router = express.Router();

router
  .route("/")
  .post(validateToken, accessChat)
  .get(validateToken, fetchChats);
router
  .route("/group")
  .post(validateToken, createGroupChat)
  .put(validateToken, renameGroup);
router.route("/group/remove").put(validateToken, removeFromGroup); // to remove a participant from the group
router.route("/group/add").put(validateToken, addToGroup); // to add a participant in the group

module.exports = router;
