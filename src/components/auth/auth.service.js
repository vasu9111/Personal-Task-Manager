import user from "../../models/user.js";
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

export default {
  registerUser,
};
