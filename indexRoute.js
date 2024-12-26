import express from "express";
import authRouter from "./src/components/auth/auth.route.js";
import taskRouter from "./src/components/task/task.route.js";
import categoryRouter from "./src/components/Category/category.route.js";
import dashboardRouter from "./src/components/dashboard/dashboard.route.js";
const router = express.Router();

router.use("/auth", authRouter);
router.use("/tasks", taskRouter);
router.use("/categories", categoryRouter);
router.use("/dashboard", dashboardRouter);
export default router;
