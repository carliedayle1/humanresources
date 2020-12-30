import express from "express";
const router = express.Router();
import {
  createEvaluationRating,
  getEvaluationRatings,
  createEvaluation,
  getEvaluators,
  getEvaluations,
  getEmployeeEvaluations,
  getRatings,
  getAllEvaluationRatings,
} from "../controllers/evaluationController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/evaluators").get(protect, admin, getEvaluators);

router.route("/").get(protect, admin, getEvaluations);

router
  .route("/rating")
  .post(protect, createEvaluationRating)
  .get(protect, admin, getRatings);

router.route("/rating/:id").get(protect, admin, getEvaluationRatings);
router.route("/rating/all/:id").get(protect, admin, getAllEvaluationRatings);

router
  .route("/:id")
  .post(protect, admin, createEvaluation)
  .get(protect, admin, getEmployeeEvaluations);

export default router;
