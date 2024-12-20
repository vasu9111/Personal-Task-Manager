import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    description: String,
    dueDate: Date,
    priority: { type: String, enum: ["low", "medium", "high"], default: "low" },
    status: {
      type: String,
      enum: ["pending", "in_progress", "completed", "archived"],
      default: "pending",
    },
    tags: { type: Array },
    attachments: [
      {
        filename: { type: String },
        path: { type: String },
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    completedAt: { type: Date },
  },
  { versionKey: false }
);

const task = mongoose.model("task", taskSchema);

export default task;
