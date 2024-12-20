import express from "express";
import categoryController from "./category.controller.js";
import cetegoryValidation from "./category.validation.js";
import middleware from "../../middleware/validation.js";

const router = express.Router();
router.post(
  "/categories",
  middleware.authenticateToken,
  middleware.validate(cetegoryValidation.category),
  categoryController.createCategory
);
router.get(
  "/categories",
  middleware.authenticateToken,
  categoryController.getAllCategory
);
export default router;
