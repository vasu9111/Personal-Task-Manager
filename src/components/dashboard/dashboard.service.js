import TaskMdl from "../../models/task.js";

const getDashboardSummary = async (req) => {
  const userId = req.user._id;
  try {
    const summary = await TaskMdl.find({ userId });
    const todaySummary = summary.filter((summary) => {
      return (
        summary.dueDate.toLocaleDateString() == new Date().toLocaleDateString()
      );
    });
    if (todaySummary.length === 0) {
      throw new Error("TODAY_SUMMARY_NOT_FOUND");
    }
    return { dueToday: todaySummary.length, summarytask: todaySummary };
  } catch (err) {
    const error = new Error(err.message);
    throw error;
  }
};

const getDashboardStats = async (req) => {
  const userId = req.user._id;
  try {
    const stats = await TaskMdl.find({ userId });
    const pendingCount = stats.filter(
      (task) => task.status === "pending"
    ).length;
    const completedCount = stats.filter(
      (task) => task.status === "completed"
    ).length;
    const in_progressCount = stats.filter(
      (task) => task.status === "in_progress"
    ).length;
    const archivedCount = stats.filter(
      (task) => task.status === "archived"
    ).length;
    const statusSummary = {
      pending: pendingCount,
      compile: completedCount,
      in_progress: in_progressCount,
      archived: archivedCount,
    };
    return {
      stats: statusSummary,
    };
  } catch (err) {
    const error = new Error(err.message);
    throw error;
  }
};
export default {
  getDashboardSummary,
  getDashboardStats,
};
