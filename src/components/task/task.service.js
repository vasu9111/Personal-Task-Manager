import Task from "../../models/task.js";

const createTask = async (userId, taskData) => {
  try {
    const tags = taskData.tags.split(",");
    const task = new Task({
      userId,
      title: taskData.title,
      description: taskData.description,
      dueDate: taskData.dueDate,
      priority: taskData.priority,
      status: taskData.status,
      category: taskData.category,
      tags: tags,
      attachments: taskData.attachments,
    });

    await task.save();
    return { message: "Task created successfully", task };
  } catch (err) {
    const error = new Error(err.message);
    throw error;
  }
};

// Get all tasks for a user
const getTasks = async (userId) => {
  try {
    const task = await Task.find({ userId });
    if (!task || task.length === 0) {
      const error = new Error("TASK_NOT_FOUND");
      throw error;
    }
    return task;
  } catch (err) {
    const error = new Error(err.message);
    throw error;
  }
};
//Get task by id
const getTaskById = async (taskId) => {
  try {
    const task = await Task.findById(taskId);
    if (!task) {
      const error = new Error("TASK_NOT_FOUND");
      throw error;
    }
    return task;
  } catch (err) {
    const error = new Error(err.message);
    throw error;
  }
};

export default {
  createTask,
  getTasks,
  getTaskById,
};
