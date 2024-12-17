import user from "../../models/user.js";
import jwt from "jsonwebtoken";
import config from "../../config/auth.js";
import dateHelper from "../../utils/dateHelper.js";
import bcrypt from "bcrypt";
const emailExistingCheck = async (email) => {
  const countEmailExisting = await user.countDocuments({ email });

  if (countEmailExisting > 0) {
    return true;
  }
  return false;
};
// Add user
const registerUser = async (reqBody) => {
  const { name, email, password } = reqBody;
  try {
    const emailCheck = await emailExistingCheck(email);
    if (emailCheck) {
      const error = new Error("user already exist");
      error.status = 400;
      throw error;
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 5);
    // Create new user
    const newUser = new user({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    const userAdd = await newUser.save();

    const result = {
      _id: userAdd._id,
      name: userAdd.name,
      email: userAdd.email,
      createdAt: userAdd.createdAt,
      preferences: userAdd.preferences,
    };

    return result;
  } catch (err) {
    const error = new Error(err.message);
    throw error;
  }
};
//login Services
const { accessTokenKey, accessTokenExpiry } = config.jwt;
const loginUser = async (reqBody) => {
  const { email, password } = reqBody;
  try {
    // Find user by username
    const findUser = await user.findOne({ email });

    if (!findUser) {
      const error = new Error("Invalid credentials");
      error.status = 400;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, findUser.password);
    if (!isPasswordValid) {
      const error = new Error("Invalid password");
      error.status = 400;
      throw error;
    }
    const accessToken = jwt.sign({ _id: findUser._id }, accessTokenKey, {
      expiresIn: accessTokenExpiry,
    });

    findUser.lastLogin = dateHelper.getCurrentDate();
    await findUser.save();

    return {
      message: "Login successful",
      accessToken: accessToken,
    };
  } catch (err) {
    const error = new Error(err.message);
    throw error;
  }
};
const resetPassword = async (reqBody) => {
  const { email, password } = reqBody;
  try {
    const userFound = await user.findOne({ email });

    if (!userFound) {
      const error = new Error(" Email ID is wrong please try again");
      error.status = 400;
      throw error;
    }

    const isSamePassword = await bcrypt.compare(password, userFound.password);
    if (isSamePassword) {
      const error = new Error(
        "New password cannot be the same as the current password"
      );
      error.status = 400;
      throw error;
    }
    const hashedPassword = await bcrypt.hash(password, 5);

    await user.findByIdAndUpdate(userFound._id, {
      password: hashedPassword,
    });

    return { message: "Password reseted successfully" };
  } catch (err) {
    const error = new Error(err.message);
    throw error;
  }
};
export default {
  registerUser,
  loginUser,
  resetPassword,
};
