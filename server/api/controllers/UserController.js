const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/UserModel");

class UserController {
  static registerUser = asyncHandler(async (req, res) => {
    const { username, email, password, confirm_password } = req.body;
    if (!username || !email || !password || !confirm_password) {
      res.status(404).send({ message: "All fields are mandatory!" });
    }
    if (password !== confirm_password) {
      res.status(404).send({ message: "All fields are mandatory!" });
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
      res.status(400).send({ message: "User already registered!" });
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
    else res.send({ message: "User data invalid!" });
  });

  static loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).send({ message: "All fields are mandatory!" });
    }

    const user = await User.findOne({ username });

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
      res.status(401).send({ message: "Email or password is not valid!" });
    }
  });

  static currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
  });

  static followUsers = asyncHandler(async (req, res) => {
    const { username, followUser } = req.body;

    if (!username || !followUser) {
      res.status(404).send({ message: "Please provide all details!" });
    }

    const userToFollowData = await User.find({ username: followUser });
    if (!userToFollowData) {
      res.status(404).send({ message: "User doesn't exists! Cannot Follow!" });
    }

    const currentUser = await User.find({ username });
    if (!currentUser) {
      res.status(404).send({ message: "User not found exists!" });
    }

    // Checking if the current user is already following the intended follow user
    if (
      currentUser?.following?.some((user) => {
        console.log(user, "currentUser");
        return user.username === followUser;
      })
    ) {
      res.status(400).send({ message: "You are already following this user!" });
    }

    const updatedFollowings = await User.findOneAndUpdate(
      { username: username },
      { $addToSet: { following: { username: followUser } } },
      { new: true }
    );
    if (!updatedFollowings) {
      res.status(404).send({ message: "Cannot follow user!" });
    }
    await updatedFollowings.save();
    res.json({ message: "User followed successfully." });
  });
}
module.exports = UserController;
