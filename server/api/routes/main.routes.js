const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  currentUser,
  followUsers,
  getAllUsers,
} = require("../controllers/UserController");
const validateToken = require("../../middlewares/ValidateToken");

router.get("/all", validateToken, getAllUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/follow", validateToken, followUsers);
router.get("/current", validateToken, currentUser);

module.exports = router;
