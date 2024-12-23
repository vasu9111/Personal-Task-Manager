import Joi from "joi";
const createTask = Joi.object({
  userId: Joi.string(),
  title: Joi.string().min(3).max(255).required().messages({
    "string.min": "Title must be at least 3 characters long.",
    "string.max": "Title must be at 255 characters.",
    "any.required": "Title is required.",
  }),
  description: Joi.string().max(1000).messages({
    "string.max": "Description must be 1000 characters.",
  }),
  dueDate: Joi.date().required().messages({
    "any.required": "Due date is required.",
  }),
  priority: Joi.string().valid("low", "medium", "high").required().messages({
    "any.only": "Priority must be one of the following: low, medium, or high.",
    "any.required": "Priority is required.",
  }),
  status: Joi.string()
    .valid("pending", "in_progress", "completed", "archived")
    .required()
    .messages({
      "any.only":
        "Status must be one of the following: pending, in_progress, completed, or archived.",
      "any.required": "Status is required.",
    }),
  // category: Joi.string(),
  tags: Joi.string().max(50).messages({
    "string.max": "Each tag must be 50 characters.",
    "any.required": "Tags is required.",
  }),
  attachments: Joi.array()
    .required()
    .items(
      Joi.object({
        filename: Joi.string().messages({
          "any.required": "Attachment filename is required.",
        }),
        path: Joi.string().messages({
          "any.required": "Attachment path is required.",
        }),
        uploadedAt: Joi.date().iso(),
      })
    ),
  createdAt: Joi.date().optional(),
  updatedAt: Joi.date().optional(),
  completedAt: Joi.date().iso().optional(),
});
export default {
  createTask,
};
