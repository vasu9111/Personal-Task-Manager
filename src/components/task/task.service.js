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

export default {
  createTask,
};
