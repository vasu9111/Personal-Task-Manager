import express from "express";
import authController from "./auth.controller.js";
import authValidation from "./auth.validation.js";
import middleware from "../../middleware/auth.js";
const router = express.Router();
router.post(
  "/register",
  middleware.validate(authValidation.registerUser),
  authController.registerUser
);
router.post(
  "/login",
  middleware.validate(authValidation.loginUser),
  authController.loginUser
);
router.post(
  "/reset-password",
  middleware.authenticateToken,
  authController.resetPassword
);
router.get(
  "/profile",
  middleware.authenticateToken,
  authController.getUserProfile
);
router.put(
  "/profile",
  middleware.authenticateToken,
  authController.updateUserProfile
);
export default router;
