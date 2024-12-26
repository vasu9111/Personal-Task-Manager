import dashboardService from "./dashboard.service.js";
const getDashboardsummary = async (req, res, next) => {
  try {
    const summary = await dashboardService.getDashboardSummary(req.user._id);
    res.status(200).json(summary);
  } catch (error) {
    next(error);
  }
};

export default {
  getDashboardsummary,
};
