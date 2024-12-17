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
    req.session.accessToken = tokenData.accessToken;
    req.session.refreshToken = tokenData.refreshToken;
    res.status(200).json(tokenData);
  } catch (error) {
    next(error);
  }
};
export default {
  registerUser,
  loginUser,
};
