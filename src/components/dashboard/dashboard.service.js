import TaskMdl from "../../models/task.js";

const getDashboardSummary = async (userId) => {
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
export default {
  getDashboardSummary,
};
