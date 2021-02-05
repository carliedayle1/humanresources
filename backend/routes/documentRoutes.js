import express from "express";
const router = express.Router();
import {
  createDocument,
  listDocuments,
  deleteDocument,
  listEmployeeDocuments,
} from "../controllers/documentController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, createDocument).get(protect, listDocuments);

router
  .route("/:id")
  .delete(protect, deleteDocument)
  .get(protect, admin, listEmployeeDocuments);

// router.route("/download/:id").get(protect, downloadDocument);

export default router;
