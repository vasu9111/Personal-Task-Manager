import express from "express";
import taskcontroller from "./task.controller.js";
import taskvalidation from "./task.validation.js";
import middleware from "../../middleware/task.js";
const router = express.Router();

router.post(
  "/",
  middleware.authenticateToken,
  middleware.validate(taskvalidation.createTask),
  taskcontroller.createTask
);
router.get("/", middleware.authenticateToken, taskcontroller.getAllTasks);

router.put("/:id", middleware.authenticateToken, taskcontroller.updateTask);
router.delete("/:id", middleware.authenticateToken, taskcontroller.deleteTask);
router.patch(
  "/:id/status",
  middleware.authenticateToken,
  taskcontroller.updateTaskStatus
);
router.get("/today", middleware.authenticateToken, taskcontroller.getTodayTask);
router.get(
  "/upcoming",
  middleware.authenticateToken,
  taskcontroller.getUpcomingTask
);
router.get(
  "/overdue",
  middleware.authenticateToken,
  taskcontroller.getOverdueTask
);
router.get("/:id", middleware.authenticateToken, taskcontroller.getTaskById);
export default router;
