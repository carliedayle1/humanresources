import express from "express";
const router = express.Router();
import { getUnseenNotifications } from "../controllers/notificationController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/:id").get(protect, getUnseenNotifications);

export default router;
