import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { idNumber, password } = req.body;

  const user = await User.findOne({ idNumber });

  if (user && (await user.matchPassword(password))) {
    const { name, idNumber, isAdmin, profilePicture, campus, userType } = user;
    res.json({
      name,
      idNumber,
      isAdmin,
      profilePicture,
      campus,
      userType,
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
    password,
    isAdmin,
  } = req.body;

  const userExist = await User.findOne({ idNumber });

  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    idNumber,
    name,
    email,
    college,
    position,
    password,
    isAdmin,
    userType: req.user.userType,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      idNumber: user.idNumber,
      name: user.name,
      email: user.email,
      college: user.college,
      position: user.position,
      isAdmin: user.isAdmin,
      userType: user.userType,
      profilePicture: user.profilePicture,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      profilePicture: user.profilePicture,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc Get all users
// @route GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ userType: req.user.userType });

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

  const { name, email, isAdmin, userType } = req.body;

  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;
    user.isAdmin = isAdmin;
    user.userType = userType;

    const updatedUser = await user.save();

    res.status(201);

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      userType: updatedUser.userType,
    });
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
    throw new Error("User not found");
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
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found!");
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
};
