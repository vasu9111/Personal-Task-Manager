import express from "express";
import dashboardController from "./dashboard.controller.js";
import middleware from "../../middleware/auth.js";

const router = express.Router();
router.get(
  "/summary",
  middleware.authenticateToken,
  dashboardController.getDashboardsummary
);
export default router;