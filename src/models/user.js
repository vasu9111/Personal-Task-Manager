import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    createdAt: { type: Date },
    // refreshToken: { type: String },
    lastLogin: {
      type: Date,
      default: null,
    },
    preferences: {
      defaultView: { type: String, default: "list" },
      emailNotifications: { type: Boolean, default: true },
      theme: { type: String, default: "light" },
    },
    confirmPassword: {
      type: String,
    },
    newPAssword: {
      type: String,
    },
    confirmPassword: {
      type: String,
    },
  },
  { versionKey: false }
);
const UserMdl = mongoose.model("users", userSchema);

export default UserMdl;
