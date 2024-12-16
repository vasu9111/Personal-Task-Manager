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

export default router;
