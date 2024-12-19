import Joi from "joi";
const createTask = Joi.object({
  userId: Joi.string(),
  title: Joi.string().required().messages({
    "any.required": "titel is required",
  }),
  description: Joi.string().optional(),
  dueDate: Joi.date().required(),
  priority: Joi.string().valid("low", "medium", "high").required(),
  status: Joi.string()
    .valid("pending", "in_progress", "completed", "archived")
    .required(),
  category: Joi.string(),
  tags: Joi.string(),
  attachments: Joi.array()
    .items(
      Joi.object({
        filename: Joi.string().min(1).max(255),
        path: Joi.string(),
        uploadedAt: Joi.date().iso(),
      })
    )
    .optional(),
  createdAt: Joi.date().optional(),
  updatedAt: Joi.date().optional(),
  completedAt: Joi.date().iso().optional(),
});
export default {
  createTask,
};
