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
// get all user category
const getAllCategory = async (req, res, next) => {
  try {
    const category = await categoryService.getAllCategory(req.user._id);
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const category = await categoryService.updateCategory(
      req.params.id,
      req.body
    );
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};
export default {
  createCategory,
  getAllCategory,
  updateCategory,
};
