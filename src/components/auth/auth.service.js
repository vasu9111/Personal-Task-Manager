import UserMdl from "../../models/user.js";
import jwt from "jsonwebtoken";
import config from "../../config/index.js";
import dateHelper from "../../utils/dateHelper.js";
import bcrypt from "bcrypt";
const emailExistingCheck = async (email) => {
  const countEmailExisting = await UserMdl.countDocuments({ email });

  if (countEmailExisting > 0) {
    return true;
  }
  return false;
};
// Add user
const {
  accessTokenKey,
  refreshTokenKey,
  accessTokenExpiry,
  refreshTokenExpiry,
} = config.jwt;
const registerUser = async (reqBody) => {
  const { name, email, password } = reqBody;
  try {
    const emailCheck = await emailExistingCheck(email);
    if (emailCheck) {
      throw new Error("USER_ALREADY_EXIST");
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 5);
    // Create new user
    const newUser = new UserMdl({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });
    const userAdd = await newUser.save();
    const accessToken = jwt.sign({ _id: userAdd._id }, accessTokenKey, {
      expiresIn: accessTokenExpiry,
    });
    const refreshToken = jwt.sign({ _id: userAdd._id }, refreshTokenKey, {
      expiresIn: refreshTokenExpiry,
    });

    const result = {
      _id: userAdd._id,
      name: userAdd.name,
      email: userAdd.email,
      createdAt: userAdd.createdAt,
      preferences: userAdd.preferences,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };

    return result;
  } catch (err) {
    const error = new Error(err.message);
    throw error;
  }
};
//login Services
const loginUser = async (reqBody) => {
  const { email, password } = reqBody;
  try {
    // Find user by username
    const findUser = await UserMdl.findOne({ email });
    if (!findUser) {
      throw new Error("INVALID_CREDENTIALS");
    }
    const isPasswordValid = await bcrypt.compare(password, findUser.password);
    if (!isPasswordValid) {
      throw new Error("INVALID_PASSWORD");
    }
    const accessToken = jwt.sign({ _id: findUser._id }, accessTokenKey, {
      expiresIn: accessTokenExpiry,
    });
    const refreshToken = jwt.sign({ _id: findUser._id }, refreshTokenKey, {
      expiresIn: refreshTokenExpiry,
    });

    findUser.lastLogin = dateHelper.getCurrentDate();
    await findUser.save();

    return {
      message: "Login successful",
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  } catch (err) {
    const error = new Error(err.message);
    throw error;
  }
};
const resetPassword = async (reqBody) => {
  const { email, password } = reqBody;
  try {
    const userFound = await UserMdl.findOne({ email });
    if (!userFound) {
      throw new Error("USER_NOT_FOUND");
    }

    const isSamePassword = await bcrypt.compare(password, userFound.password);
    if (isSamePassword) {
      throw new Error("SAME_PASSWORD");
    }
    const hashedPassword = await bcrypt.hash(password, 5);

    await UserMdl.findByIdAndUpdate(userFound._id, {
      password: hashedPassword,
    });

    return { message: "Password reseted successfully" };
  } catch (err) {
    const error = new Error(err.message);
    throw error;
  }
};
const getUserProfile = async (userId) => {
  try {
    const userProfile = await UserMdl.findById(
      userId,
      "name email preferences"
    );
    if (!userProfile) {
      throw new Error("USER_NOT_FOUND");
    }

    return userProfile;
  } catch (err) {
    const error = new Error(err.message);
    throw error;
  }
};

const updateUserProfile = async (userId, updateData) => {
  try {
    const updatedProfile = await UserMdl.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
      fields: "name email preferences",
    });

    if (!updatedProfile) {
      throw new Error("USER_NOT_FOUND");
    }
    return updatedProfile;
  } catch (err) {
    const error = new Error(err.message);
    throw error;
  }
};

export default {
  registerUser,
  loginUser,
  resetPassword,
  getUserProfile,
  updateUserProfile,
};
