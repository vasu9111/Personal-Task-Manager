import Joi from "joi";

// Define Joi validation schema for category
const category = Joi.object({
  userId: Joi.string(),
  name: Joi.string().min(3).max(100).required().messages({
    "string.empty": "Name is not empty",
    "string.min": "Name must be at least 3 characters long",
    "string.max": "Name can be at most 100 characters long",
    "any.required": "Name is required",
  }),
  color: Joi.string()
    .required()
    .valid("red", "green", "blue", "yellow", "black")
    .required()
    .messages({
      "string.empty": "color is not empty",
      "any.only":
        "Color must be one of the following: red, green, blue, yellow, black",
      "any.required": "Color is required",
    }),
  description: Joi.string().max(500).optional(),
  createdAt: Joi.date().optional(),
});

export default { category };
