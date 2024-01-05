const validateToken = require("../../middlewares/ValidateToken");

const express = require("express");
const {
  allMessages,
  sendMessage,
} = require("../controllers/message.controller");

const router = express.Router();

router.route("/:chatId").get(validateToken, allMessages);
router.route("/").post(validateToken, sendMessage);

module.exports = router;
