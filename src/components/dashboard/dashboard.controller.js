import dashboardService from "./dashboard.service.js";
const getDashboardsummary = async (req, res, next) => {
  try {
    const summary = await dashboardService.getDashboardSummary(req.user._id);
    res.status(200).json(summary);
  } catch (error) {
    next(error);
  }
};

const getDashboardStats = async (req, res, next) => {
  try {
    const stats = await dashboardService.getDashboardStats(req.user._id);
    res.status(200).json(stats);
  } catch (error) {
    next(error);
  }
};
export default {
  getDashboardsummary,
  getDashboardStats,
};
