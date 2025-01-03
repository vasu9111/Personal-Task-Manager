import TaskMdl from "../../models/task.js";

const createTask = async (req) => {
  const userId = req.user._id;
  const {
    title,
    description,
    dueDate,
    priority,
    status,
    category,
    tags,
    attachments,
    reminder,
  } = req.body;
  try {
    const task = new TaskMdl({
      userId,
      title: title,
      description: description,
      dueDate: dueDate,
      priority: priority,
      status: status,
      category: category,
      tags: tags,
      attachments: attachments,
      reminder: reminder,
    });

    await task.save();
    return { message: "Task created successfully", task };
  } catch (err) {
    const error = new Error(err.message);
    throw error;
  }
};

// Get all tasks for a user
const getTasks = async (req) => {
  try {
    const userId = req.params.id;
    const task = await TaskMdl.find({ userId });
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
const getTaskById = async (req) => {
  try {
    const taskId = req.params.id;
    const task = await TaskMdl.findById(taskId);
    if (!task) {
      const error = new Error("TASK_NOT_FOUND");
      throw error;
    }
    if (req.user._id !== task.userId.toString()) {
      const error = new Error("NOT_TASK_ID");
      throw error;
    }
    return task;
  } catch (err) {
    const error = new Error(err.message);
    throw error;
  }
};
// Update a task
const updateTask = async (req) => {
  try {
    const taskId = req.params.id;
    const {
      title,
      description,
      dueDate,
      priority,
      status,
      category,
      tags,
      attachments,
      reminder,
    } = req.body;

    const task = await TaskMdl.findByIdAndUpdate(
      taskId,
      {
        title: title,
        description: description,
        dueDate: dueDate,
        priority: priority,
        status: status,
        category: category,
        tags: tags,
        attachments: attachments,
        reminder: reminder,
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
const deleteTask = async (req) => {
  const taskId = req.params.id;

  try {
    const task = await TaskMdl.findByIdAndDelete(taskId);
    if (!task) {
      throw new Error("TASK_NOT_FOUND");
    }
    return { message: "Task delete successfully" };
  } catch (err) {
    const error = new Error(err.message);
    throw error;
  }
};
const updateTaskStatus = async (req) => {
  const taskId = req.params.id;
  const { status } = req.body;
  try {
    const task = await TaskMdl.findByIdAndUpdate(taskId, {
      new: true,
      status: status,
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

const getTodayTask = async (req) => {
  const userId = req.user._id;
  try {
    const tasks = await TaskMdl.find({ userId });
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
const getUpcomingTask = async (req) => {
  const userId = req.user._id;
  try {
    const tasks = await TaskMdl.find({ userId });
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
const getOverdueTask = async (req) => {
  const userId = req.user._id;
  try {
    const tasks = await TaskMdl.find({ userId });
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
