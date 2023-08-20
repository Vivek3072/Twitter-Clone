const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/UserModel");
import ErrorRespond from "../../helpers/ErrorRespond";

class UserController {
  static registerUser = asyncHandler(async (req, res) => {
    const { username, email, password, confirm_password } = req.body;
    if (!username || !email || !password || !confirm_password) {
      return ErrorRespond(res, 404, "Please enter a valid email.");
    }
    if (password !== confirm_password) {
      return ErrorRespond(res, 404, "Passwords did not match!");
    }

    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
      return ErrorRespond(res, 400, "User already registered!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    if (newUser)
      res.status(201).json({
        _id: newUser.id,
        email: newUser.email,
        username: newUser.username,
      });
    else return ErrorRespond(res, 400, "User data invalid!");
  });

  static loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return ErrorRespond(res, 400, "All fields are mandatory!");
    }

    const user = await User.findOne({ username });
    if (!user) {
      return ErrorRespond(res, 404, "User not found!");
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign(
        {
          user: {
            username: user.username,
            id: user.id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );
      res.status(200).json({ accessToken });
    } else {
      return ErrorRespond(res, 401, "Incorrect password!");
    }
  });

  static currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
  });

  static followUsers = asyncHandler(async (req, res) => {
    const { username, followUser } = req.body;

    if (!username || !followUser) {
      return ErrorRespond(res, 404, "Please provide all details!");
    }

    const userToFollowData = await User.find({ username: followUser });
    if (!userToFollowData) {
      return ErrorRespond(res, 404, "User doesn't exists! Cannot Follow!");
    }

    const currentUser = await User.find({ username });
    if (!currentUser) {
      return ErrorRespond(res, 404, "User doesn't exists!");
    }

    // Checking if the current user is already following the intended follow user
    if (
      currentUser?.following?.some((user) => {
        console.log(user, "currentUser");
        return user.username === followUser;
      })
    ) {
      return ErrorRespond(res, 400, "You are already following this user!");
    }

    const updatedFollowings = await User.findOneAndUpdate(
      { username: username },
      { $addToSet: { following: { username: followUser } } },
      { new: true }
    );
    if (!updatedFollowings) {
      return ErrorRespond(res, 404, "Cannot follow user!");
    }
    await updatedFollowings.save();
    res.json({ message: "User followed successfully." });
  });
}
module.exports = UserController;
