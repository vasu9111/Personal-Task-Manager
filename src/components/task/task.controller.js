import taskService from "./task.service.js";
// Create a new task
const createTask = async (req, res, next) => {
  try {
    const task = await taskService.createTask(req.user._id, req.body);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

export default {
  createTask,
};
