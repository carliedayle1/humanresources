import asyncHandler from "express-async-handler";
import Evaluation from "../models/evaluationModel.js";
import Rating from "../models/ratingModel.js";
import Rank from "../models/rankModel.js";
import User from "../models/userModel.js";

// @desc    Create evaluation rating
// @route   POST /api/evaluation/rating
// @access  Private/Evaluator
const createEvaluationRating = asyncHandler(async (req, res) => {
  const { userId, educ, acad, prof } = req.body;
  const evaluator = `${req.user.lastname}, ${req.user.firstname}`;

  const rating = await Rating.create({
    educationalQualification: educ,
    academicExperience: acad,
    professionalAchievement: prof,
    evaluatedBy: evaluator,
    ratingType: req.user.userType,
    user: userId,
  });

  if (rating) {
    const admins = await User.find({
      isAdmin: true,
      userType: req.user.userType,
    });

    admins.map((user) => {
      return user.notifications.push({
        url: "/evaluation",
        message: `Evaluation rating submitted by ${evaluator}`,
      });
    });

    admins.map((user) => {
      return user.save();
    });

    res.json("Rating created successfully");
  } else {
    res.status(401);
    throw new Error("Invalid rating information");
  }
});

// @desc    Get all evaluation ratings of a specific user
// @route   GET /api/evaluation/rating/:id
// @access  Private/Evaluator
const getEvaluationRatings = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  const ratings = await Rating.find({ user: userId, verified: false }).sort(
    "-createdAt"
  );

  if (ratings) {
    res.json(ratings);
  } else {
    res.status(404);
    throw new Error("User ratings not found");
  }
});

// @desc    Get all evaluation ratings of a specific user with true
// @route   GET /api/evaluation/rating/all/:id
// @access  Private/Evaluator
const getAllEvaluationRatings = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  const ratings = await Rating.find({ user: userId }).sort("-createdAt");

  if (ratings) {
    res.json(ratings);
  } else {
    res.status(404);
    throw new Error("User ratings not found");
  }
});

// @desc    Create evaluation
// @route   POST /api/evaluation/:id
// @access  Private/Admin
const createEvaluation = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const { total, qce, rank } = req.body;

  const ratings = await Rating.find({ user: userId, verified: false });

  if (ratings) {
    const evaluation = await Evaluation.create({
      total,
      qce,
      rank,
      verifiedBy: `${req.user.lastname}, ${req.user.firstname}`,
      verifyType: req.user.userType,
      user: userId,
    });

    if (evaluation) {
      ratings.map((rating) => {
        return evaluation.ratings.push(rating);
      });

      ratings.map((rating) => {
        return (rating.verified = true);
      });

      await ratings.map((rating) => rating.save());

      const user = await User.findById(userId);
      user.rank = evaluation.rank;
      user.notifications.push({
        url: "/profile",
        message: "Rank updated",
      });

      user.evalPoints = Number(
        Number(user.evalPoints) + Number(total) + Number(qce)
      );

      await user.save();

      await Rank.create({ name: evaluation.rank, user: userId });

      res.json("Evaluation created successfully");
    } else {
      res.status(404);
      throw new Error("Invalid evaluation data");
    }
  } else {
    res.status(404);
    throw new Error("User ratings not found");
  }
});

// @desc    Get all evaluators
// @route   GET /api/evaluation/evaluators
// @access  Private/Admin
const getEvaluators = asyncHandler(async (req, res) => {
  const evaluators = await User.find({
    userType: req.user.userType,
    isEvaluator: true,
  });

  if (evaluators) {
    res.json(evaluators);
  } else {
    res.status(404);
    throw new Error("No evaluators created yet..");
  }
  // res.json("hello");
});

// @desc    Get all evaluations
// @route   GET /api/evaluation/
// @access  Private/Admin
const getEvaluations = asyncHandler(async (req, res) => {
  const evaluations = await Evaluation.find({
    verifyType: req.user.userType,
  })
    .sort("-createdAt")
    .populate("user", "idNumber firstname lastname");

  if (evaluations) {
    res.json(evaluations);
  } else {
    res.status(404);
    throw new Error("Invalid evaluation data");
  }
});

// @desc    Get all evaluations of employee
// @route   GET /api/evaluation/:id
// @access  Private/Admin
const getEmployeeEvaluations = asyncHandler(async (req, res) => {
  const evaluations = await Evaluation.find({
    user: req.params.id,
  }).sort("-createdAt");

  if (evaluations) {
    res.json(evaluations);
  } else {
    res.status(404);
    throw new Error("Invalid evaluation data");
  }
});

// @desc    Get all ratings
// @route   GET /api/evaluation/ratings
// @access  Private/Admin
const getRatings = asyncHandler(async (req, res) => {
  const ratings = await Rating.find({
    ratingType: req.user.userType,
  })
    .sort("-createdAt")
    .populate("user", "idNumber name");

  if (ratings) {
    res.json(ratings);
  } else {
    res.status(404);
    throw new Error("Invalid rating data");
  }
});

export {
  createEvaluationRating,
  getEvaluationRatings,
  getAllEvaluationRatings,
  createEvaluation,
  getEvaluators,
  getEvaluations,
  getEmployeeEvaluations,
  getRatings,
};
