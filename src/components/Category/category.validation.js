import Joi from "joi";

// Define Joi validation schema for category
const category = Joi.object({
  userId: Joi.string(),
  name: Joi.string().min(3).max(100).required(),
  color: Joi.string().required(),
  description: Joi.string().max(500).optional(),
  createdAt: Joi.date().optional(),
});

export default { category };
