import { getDashboardDataService } from "../model/dashboardModel.js";

// Standardized response function (copied from your userController)
const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

/**
 * Handles the GET request to fetch all dashboard data.
 */
export const getDashboardData = async (req, res, next) => {
  try {
    const dashboardData = await getDashboardDataService();
    handleResponse(
      res,
      200,
      "Dashboard data fetched successfully",
      dashboardData
    );
  } catch (error) {
    // Pass error to centralized error handler
    next(error);
  }
};
