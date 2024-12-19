import taskMdl from "../../models/task.js";

const createTask = async (userId, taskData) => {
  try {
    const tags = taskData.tags.split(",");
    const task = new taskMdl({
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
    const task = await taskMdl.find({ userId });
    if (task.length === 0) {
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
    const task = await taskMdl.findById(taskId);
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
// Update a task
const updateTask = async (taskId, taskData) => {
  try {
    const tags = taskData.tags.split(",");
    const task = await taskMdl.findByIdAndUpdate(
      taskId,
      {
        title: taskData.title,
        description: taskData.description,
        dueDate: taskData.dueDate,
        priority: taskData.priority,
        status: taskData.status,
        category: taskData.category,
        tags: tags,
        attachments: taskData.attachments,
      },
      { new: true }
    );
    if (!task) {
      throw new Error("TASK_NOT_FOUND");
    }
    return { message: "Task Update successfully", task };
  } catch (err) {
    const error = new Error(err.message);
    throw error;
  }
};
// Delete task
const deleteTask = async (taskId) => {
  try {
    const task = await taskMdl.findByIdAndDelete(taskId);
    if (!task) {
      throw new Error("TASK_NOT_FOUND");
    }
    return { message: "Task delele successfully" };
  } catch (err) {
    const error = new Error(err.message);
    throw error;
  }
};
const updateTaskStatus = async (taskId, reqBody) => {
  try {
    const task = await taskMdl.findByIdAndUpdate(taskId, reqBody, {
      new: true,
    });

    if (!task) {
      throw new Error("TASK_NOT_FOUND");
    }
    return task;
  } catch (err) {
    const error = new Error(err.message);
    throw error;
  }
};

const getTodayTask = async (userId) => {
  try {
    const tasks = await taskMdl.find({ userId });
    const todayTasks = tasks.filter((task) => {
      return (
        task.dueDate.toLocaleDateString() == new Date().toLocaleDateString()
      );
    });
    if (todayTasks.length === 0) {
      throw new Error("TODAY_TASK_NOT_FOUND");
    }
    return todayTasks;
  } catch (err) {
    const error = new Error(err.message);
    throw error;
  }
};
const getUpcomingTask = async (userId) => {
  try {
    const tasks = await taskMdl.find({ userId });
    const upcomingTasks = tasks.filter((task) => {
      return (
        task.dueDate.toLocaleDateString() >= new Date().toLocaleDateString()
      );
    });
    if (upcomingTasks.length === 0) {
      throw new Error("UPCOMING_TASK_NOT_FOUND");
    }
    return upcomingTasks;
  } catch (err) {
    const error = new Error(err.message);
    throw error;
  }
};
const getOverdueTask = async (userId) => {
  try {
    const tasks = await taskMdl.find({ userId });
    const OverdueTask = tasks.filter((task) => {
      return (
        task.dueDate.toLocaleDateString() < new Date().toLocaleDateString()
      );
    });
    if (OverdueTask.length === 0) {
      throw new Error("OVERDUE_TASK_NOT_FOUND");
    }
    return OverdueTask;
  } catch (err) {
    const error = new Error(err.message);
    throw error;
  }
};
export default {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  updateTaskStatus,
  getTodayTask,
  getUpcomingTask,
  getOverdueTask,
};
