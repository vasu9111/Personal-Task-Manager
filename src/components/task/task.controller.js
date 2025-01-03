import taskService from "./task.service.js";
// Create a new task
const createTask = async (req, res, next) => {
  try {
    const task = await taskService.createTask(req);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};
// Get all tasks for a user
const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await taskService.getTasks(req);
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};
//Get task by id
const getTaskById = async (req, res, next) => {
  try {
    const task = await taskService.getTaskById(req);
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};
// update a task
const updateTask = async (req, res, next) => {
  try {
    const task = await taskService.updateTask(req);
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};
// Delete task
const deleteTask = async (req, res, next) => {
  try {
    const task = await taskService.deleteTask(req);
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};
// update task by Status
const updateTaskStatus = async (req, res, next) => {
  try {
    const task = await taskService.updateTaskStatus(req);
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};
const getTodayTask = async (req, res, next) => {
  try {
    const task = await taskService.getTodayTask(req);
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

const getUpcomingTask = async (req, res, next) => {
  try {
    const task = await taskService.getUpcomingTask(req);
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};
const getOverdueTask = async (req, res, next) => {
  try {
    const task = await taskService.getOverdueTask(req);
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};
export default {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  updateTaskStatus,
  getTodayTask,
  getUpcomingTask,
  getOverdueTask,
};
