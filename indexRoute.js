import express from "express";
import authRouter from "./src/components/auth/auth.route.js";
import taskRouter from "./src/components/task/task.route.js";
import categoryRouter from "./src/components/Category/category.route.js";
const router = express.Router();

router.use("/api/auth", authRouter);
router.use("/api/tasks", taskRouter);
router.use("/api", categoryRouter);
export default router;
