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
  },
  { versionKey: false }
);
const userMdl = mongoose.model("users", userSchema);

export default userMdl;
