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
//Get task
const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await taskService.getTasks(req.user._id);
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};
//Get task by id
const getTaskById = async (req, res, next) => {
  try {
    const task = await taskService.getTaskById(req.params.id);
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

export default {
  createTask,
  getAllTasks,
  getTaskById,
};
