import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId },
    title: { type: String, required: true },
    description: String,
    dueDate: {
      type: Date,
    },
    priority: { type: String, enum: ["low", "medium", "high"], default: "low" },
    status: {
      type: String,
      enum: ["pending", "in_progress", "completed", "archived"],
      default: "pending",
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
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
    reminder: {
      isSet: { type: Boolean, default: false },
      remindAt: { type: Date },
    },
  },
  { versionKey: false }
);

const TaskMdl = mongoose.model("task", taskSchema);

export default TaskMdl;
