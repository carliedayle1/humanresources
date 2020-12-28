import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Rank from "../models/rankModel.js";
import generateToken from "../utils/generateToken.js";
import mongoose from "mongoose";

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { idNumber, password } = req.body;

  const user = await User.findOne().or([
    { idNumber: idNumber },
    { email: idNumber },
  ]);

  if (user && (await user.matchPassword(password))) {
    const {
      name,
      idNumber,
      isAdmin,
      profilePicture,
      campus,
      userType,
      isEvaluator,
      notifications,
      password,
    } = user;

    const notif = notifications.filter((not) => not.seen === false);

    res.json({
      name,
      idNumber,
      isAdmin,
      profilePicture,
      campus,
      isEvaluator,
      userType,
      notifications: notif,
      password,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid id number or password");
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Private/Admin
const registerUser = asyncHandler(async (req, res) => {
  const {
    idNumber,
    name,
    email,
    college,
    position,
    rank,
    password,
    isAdmin,
    isEvaluator,
    dateHired,
  } = req.body;

  const userExist = await User.findOne({ idNumber });

  if (userExist) {
    res.status(400);
    throw new Error("Employeee ID number already taken");
  }

  const user = await User.create({
    idNumber,
    name,
    email,
    college,
    position,
    rank,
    password,
    isAdmin,
    userType: req.user.userType,
    isEvaluator,
    dateHired,
  });

  if (user) {
    const ranking = await Rank.create({
      name: rank,
      user: user._id,
    });

    res.status(201).json("User created Successfully");
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc Get all users
// @route GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({
    userType: req.user.userType,
    isEvaluator: false,
    isAdmin: false,
  }).sort("createAt");

  res.json(users);
});

// @desc    Delete a user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc Update user
// @route PUT /api/users/:id
// @access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  const { name, email, isAdmin, position, college, campus } = req.body;

  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;
    user.position = position || user.position;
    user.college = college || user.college;
    user.campus = campus || user.campus;
    user.isAdmin = isAdmin;

    const updatedUser = await user.save();

    res.status(201);

    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("Employee not found");
  }
});

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      userType: updatedUser.userType,
      profilePicture: updatedUser.profilePicture,
      isEvaluator: updatedUser.isEvaluator,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

// @desc    Update user profile
// @route   GET /api/users/search/:id
// @access  Private/Admin
const searchUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ idNumber: req.params.id }).select(
    "-password"
  );

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("Employee does not exist!");
  }
});

// @desc    Get user ranks
// @route   GET /api/users/rank
// @access  Private/Admin
const getRanks = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });

  if (user) {
    const ranks = await Rank.find({ user: user._id }).sort("-createdAt");

    res.json(ranks);
  } else {
    res.status(404);
    throw new Error("Employee does not exist!");
  }
});

const search = (nameKey, myArray) => {
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i]._id == nameKey) {
      return myArray[i];
    }
  }

  return false;
};

// @desc    Update notification
// @route   PUT /api/users/notification
// @access  Private
const updateNotification = asyncHandler(async (req, res) => {
  const user = await User.findOne({
    _id: req.user._id,
  });
  if (user) {
    // res.json(user);
    const notify = user.notifications;

    const not = search(req.params.id, notify);
    if (not) {
      not.seen = true;
      await user.save();
      res.json(user);
    } else {
      res.status(404);
      throw new Error("Notification does not exist!");
    }
  } else {
    res.status(404);
    throw new Error("Employee does not exist!");
  }
});

export {
  authUser,
  getUserProfile,
  registerUser,
  getUsers,
  deleteUser,
  updateUser,
  getUserById,
  updateUserProfile,
  searchUser,
  getRanks,
  updateNotification,
};
