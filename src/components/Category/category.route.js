import express from "express";
import categoryController from "./category.controller.js";
import cetegoryValidation from "./category.validation.js";
import middleware from "../../middleware/validation.js";

const router = express.Router();
router.post(
  "/",
  middleware.authenticateToken,
  middleware.validate(cetegoryValidation.category),
  categoryController.createCategory
);
router.get(
  "/",
  middleware.authenticateToken,
  categoryController.getAllCategory
);
router.put(
  "/:id",
  middleware.authenticateToken,
  categoryController.updateCategory
);
router.delete(
  "/:id",
  middleware.authenticateToken,
  categoryController.deleteCategory
);
export default router;
