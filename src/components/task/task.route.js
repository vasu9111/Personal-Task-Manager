import express from "express";
import taskcontroller from "./task.controller.js";
import taskvalidation from "./task.validation.js";
import middleware from "../../middleware/task.js";
const router = express.Router();

router.post(
  "/tasks",
  middleware.authenticateToken,
  middleware.validate(taskvalidation.createTask),
  taskcontroller.createTask
);
router.get("/tasks", middleware.authenticateToken, taskcontroller.getAllTasks);

router.get(
  "/tasks/:id",
  middleware.authenticateToken,
  taskcontroller.getTaskById
);
router.put(
  "/tasks/:id",
  middleware.authenticateToken,
  taskcontroller.updateTask
);
router.delete(
  "/tasks/:id",
  middleware.authenticateToken,
  taskcontroller.deleteTask
);
router.patch(
  "/tasks/:id/status",
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
export default router;
