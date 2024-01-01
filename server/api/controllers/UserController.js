const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/UserModel");
const ErrorRespond = require("../../helpers/ErrorRespond");
const generateRandomNum = require("../../helpers/generateRandomNum");
const Tweet = require("../../models/TweetModel");

class UserController {
  static getAllUsers = asyncHandler(async (req, res) => {
    try {
      const users = await User.find();
      if (!users) return ErrorRespond(res, 400, "Users not found!");
      return res.status(200).send(users);
    } catch (err) {
      console.error(err);
      return ErrorRespond(res, 500, "Internal server error");
    }
  });
  static registerUser = asyncHandler(async (req, res) => {
    const { username, email, password, confirm_password } = req.body;

    if (!username) return ErrorRespond(res, 400, "Username is required");
    else if (!email) return ErrorRespond(res, 400, "Email is required");
    else if (
      !String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    )
      return ErrorRespond(res, 400, "Please enter a valid email.");
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

    const randomNumber = generateRandomNum(1, 50);

    const newUser = await User.create({
      username,
      email,
      following: [],
      password: hashedPassword,
      profilePic: `https://xsgames.co/randomusers/assets/avatars/pixel/${randomNumber}.jpg`,
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

  // /api/auth/search?search=vivek
  static searchUsers = asyncHandler(async (req, res) => {
    if (!req.query.search)
      return ErrorRespond(res, 404, "Please provide a query to search!");

    if (req.query.search.length < 2)
      return ErrorRespond(res, 404, "Please provide atleast two characters!");

    const keyword = req.query.search
      ? {
          /* 
          The $or operator performs a logical OR operation on an array of one or more <expressions> and selects the documents that satisfy at least one of the <expressions>.

          $regex - Provides regular expression capabilities for pattern matching strings in queries.
          $options - Specifies options that control the behavior of regular expression searches on string values.
          
          options = i, represent we want the seach to be case insensitive
           */
          $or: [
            { username: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};

    // here we are finding all the users related with the keyword in search query of request
    const searchedUsers = await User.find(keyword)
      .find({
        _id: { $ne: req.user.id }, // return all except the current user who is searching
      })
      .select("username email profilePic -_id"); // only returning the specific results to the user

    if (!searchedUsers) return ErrorRespond(res, 400, "Cannot find anything!");

    res.status(200).send(searchedUsers);
  });

  static async updatePicture(req, res) {
    try {
      const { username, profilePic } = req.body;

      const userExists = await User.findOne({ username: username });
      if (!userExists) return ErrorRespond(res, 404, "User not found!");

      if (!profilePic)
        return ErrorRespond(res, 404, "Please provide a profile picture!");

      const updatedPicture = await User.findOneAndUpdate(
        { username: username },
        { $set: { profilePic: profilePic } },
        { new: true }
      );
      const updated = await updatedPicture.save();
      if (!updated) return ErrorRespond(res, 400, "Cannot update!");

      await Tweet.updateMany(
        { username: userExists.username },
        { $set: { profilePic: profilePic } }
      );
      return res
        .status(200)
        .send({ message: "Profile Picture Updated Successfully!" });
    } catch (err) {
      console.error(err);
      return ErrorRespond(res, 500, "Internal server error");
    }
  }

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
      {
        $addToSet: {
          following: {
            username: followUser,
            profilePic: userToFollowData.profilePic,
          },
        },
      },
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
