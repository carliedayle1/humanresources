import asyncHandler from "express-async-handler";
import LeaveCredit from "../models/leaveCreditModel.js";
import User from "../models/userModel.js";
import dayjs from "dayjs";

// @desc    Create a leave credit
// @route   POST /api/leavecredits/:id
// @access  Private
const createLeaveCredit = asyncHandler(async (req, res) => {
  const { type, particular, earned, absences, balance } = req.body;
  const userId = req.params.id;

  const user = await User.findById(userId);

  if (!user) {
    res.status(401);
    throw new Error("Invalid employee data");
  } else {
    user.leaveCredits = Number(Number(user.leaveCredits) + Number(balance));
    user.absences = Number(Number(user.absences) + Number(absences));
    const notif = {
      url: "/profile",
      message: "Leave Credit updated",
    };
    user.notifications.push(notif);
    await user.save();

    const leave = await LeaveCredit.create({
      type,
      particular,
      earned,
      absences,
      balance,
      createdBy: `${req.user.lastname}, ${req.user.firstname}`,
      creatorType: req.user.userType,
      user: userId,
    });

    if (leave) {
      res.json(leave);
    } else {
      res.status(401);
      throw new Error("Invalid leave credit data");
    }
  }
});

// @desc    Get all leave credit of a user
// @route   GET /api/leavecredits/:id
// @access  Private/ADmin
const getUserLeaveCredits = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  const leaveCredits = await LeaveCredit.find({ user: userId }).sort(
    "-createdAt"
  );

  if (leaveCredits) {
    res.json(leaveCredits);
  } else {
    res.status(401);
    throw new Error("Leave credits not found");
  }
});

// @desc    Get all leave credits
// @route   GET /api/leavecredits
// @access  Private/Admin
const getLeaveCredits = asyncHandler(async (req, res) => {
  const leaveCredits = await LeaveCredit.find({
    creatorType: req.user.userType,
  })
    .sort("-createdAt")
    .populate("user", "idNumber firstname lastname");

  if (leaveCredits) {
    res.json(leaveCredits);
  } else {
    res.status(401);
    throw new Error("Leave credits not found");
  }
});

export { createLeaveCredit, getUserLeaveCredits, getLeaveCredits };
