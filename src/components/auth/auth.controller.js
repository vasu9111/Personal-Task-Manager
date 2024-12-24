import authService from "./auth.service.js";
const registerUser = async (req, res, next) => {
  try {
    const tokenData = await authService.registerUser(req.body);
    res.status(200).json(tokenData);
  } catch (error) {
    next(error);
  }
};
const loginUser = async (req, res, next) => {
  try {
    const tokenData = await authService.loginUser(req.body);
    res.status(200).json(tokenData);
  } catch (error) {
    next(error);
  }
};
const resetPassword = async (req, res, next) => {
  try {
    const tokenData = await authService.resetPassword(req.body, req.user._id);
    res.status(200).json(tokenData);
  } catch (error) {
    next(error);
  }
};
const getUserProfile = async (req, res, next) => {
  try {
    const userProfile = await authService.getUserProfile(req.user._id);
    res.status(200).json(userProfile);
  } catch (error) {
    next(error);
  }
};
const updateUserProfile = async (req, res, next) => {
  try {
    const updatedProfile = await authService.updateUserProfile(
      req.user._id,
      req.body
    );
    res.status(200).json(updatedProfile);
  } catch (error) {
    next(error);
  }
};
export default {
  registerUser,
  loginUser,
  resetPassword,
  getUserProfile,
  updateUserProfile,
};
