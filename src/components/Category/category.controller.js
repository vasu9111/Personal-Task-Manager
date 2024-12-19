import categoryService from "./category.service.js";
// Create a new category
const createCategory = async (req, res, next) => {
  try {
    const category = await categoryService.createCategory(
      req.user._id,
      req.body
    );
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

export default {
  createCategory,
};
