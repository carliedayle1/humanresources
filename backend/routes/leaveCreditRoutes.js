import express from "express";
const router = express.Router();
import {
  createLeaveCredit,
  getUserLeaveCredits,
  getLeaveCredits,
} from "../controllers/leaveCreditController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router
  .route("/:id")
  .post(protect, admin, createLeaveCredit)
  .get(protect, admin, getUserLeaveCredits);

router.route("/").get(protect, admin, getLeaveCredits);

export default router;
