import express from "express";
const router = express.Router();
import {
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
  getAdmins,
  leaveCreditsReport,
  allUsersReport,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router
  .route("/")
  .post(protect, admin, registerUser)
  .get(protect, admin, getUsers);
router.post("/login", authUser);
router.route("/profile").get(protect, getUserProfile);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.route("/admins").get(protect, admin, getAdmins);
router.route("/leaveCredits").get(protect, admin, leaveCreditsReport);
router.route("/all").get(protect, admin, allUsersReport);

router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .put(protect, admin, updateUser)
  .get(protect, admin, getUserById);

router.route("/search/:id").get(protect, searchUser);

router.route("/:id/ranks").get(protect, getRanks);

router.route("/notifications/:id").get(protect, updateNotification);

export default router;
