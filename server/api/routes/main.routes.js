const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  currentUser,
  followUsers,
  getAllUsers,
  unfollowUser,
  updatePicture,
  searchUsers,
} = require("../controllers/UserController");
const validateToken = require("../../middlewares/ValidateToken");

router.post("/register", registerUser);
router.put("/update-picture", validateToken, updatePicture);
router.post("/login", loginUser);
router.post("/follow", validateToken, followUsers);
router.post("/unfollow", validateToken, unfollowUser);
router.get("/current", validateToken, currentUser);
router.get("/users", validateToken, searchUsers);
// router.get("/all", validateToken, getAllUsers);

module.exports = router;
