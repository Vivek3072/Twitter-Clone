const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/UserController");
const validateToken = require("../../middlewares/ValidateToken");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", validateToken, currentUser);

module.exports = router;
