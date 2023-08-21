const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/UserModel");
const ErrorRespond = require("../../helpers/ErrorRespond");

class UserController {
  static getAllUsers = asyncHandler(async (req, res) => {
    try {
      const users = await User.find();
      if (!users) return ErrorRespond(res, 400, "Users not found!");
      return res.status(200).send(users);
    } catch (err) {
      //
    }
  });
  static registerUser = asyncHandler(async (req, res) => {
    const { username, email, password, confirm_password } = req.body;

    if (!username) return ErrorRespond(res, 400, "Username is required");
    else if (!email) return ErrorRespond(res, 400, "Email is required");
    else if (!password) return ErrorRespond(res, 400, "Password is required");
    else if (password.length < 6)
      return ErrorRespond(res, 400, "Password is too short!");
    else if (!confirm_password)
      return ErrorRespond(res, 400, "Please confirm your password!");
    else if (password !== confirm_password) {
      return ErrorRespond(res, 404, "Passwords did not match!");
    }

    const userAvailable = await User.findOne({ email, username });
    if (userAvailable) {
      return ErrorRespond(res, 400, "User already registered!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      following: [],
      password: hashedPassword,
    });
    if (newUser) {
      const accessToken = jwt.sign(
        {
          user: {
            username: newUser.username,
            id: newUser._id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );

      res.status(201).json({
        _id: newUser._id,
        email: newUser.email,
        username: newUser.username,
        accessToken: accessToken,
      });
    } else return ErrorRespond(res, 400, "User data invalid!");
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
        process.env.ACCESS_TOKEN_SECRET
        // { expiresIn: "1h" }
      );
      res.status(200).json({ username: user.username, accessToken });
    } else {
      return ErrorRespond(res, 401, "Incorrect password!");
    }
  });

  static currentUser = asyncHandler(async (req, res) => {
    const user = await User.find({ username: req.user.username });
    if (!user) return ErrorRespond(res, 404, "User not found!");
    else return res.status(200).json({ user });
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
    res.status(200).send(updatedFollowings);
  });

  static unfollowUser = asyncHandler(async (req, res) => {
    const { username, removeUser } = req.body;
    if (!username || !removeUser) {
      return ErrorRespond(res, 404, "Please provide all details!");
    }

    const currentUser = await User.find({ username });
    if (!currentUser) {
      return ErrorRespond(res, 404, "User doesn't exists!");
    }

    // Checking if the current user is following the intended user or not
    if (
      currentUser?.following?.some((user) => {
        return user.username !== removeUser;
      })
    ) {
      return ErrorRespond(res, 400, "You are not following this user!");
    }

    const updatedFollowings = await User.findOneAndUpdate(
      { username: username },
      { $pull: { following: { username: removeUser } } },
      { new: true }
    );
    if (!updatedFollowings) {
      return ErrorRespond(res, 404, "Cannot unfollow this user!");
    }
    await updatedFollowings.save();
    res.status(200).send(updatedFollowings);
  });
}
module.exports = UserController;
