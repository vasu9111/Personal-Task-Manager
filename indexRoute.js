import express from "express";
import authRouter from "./src/components/auth/auth.route.js";
import taskRouter from "./src/components/task/task.route.js";
const router = express.Router();

router.use("/api/auth", authRouter);
router.use("/api", taskRouter);
export default router;
