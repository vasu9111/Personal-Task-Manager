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
// update category
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
//delete category
const deleteCategory = async (req, res, next) => {
  try {
    const category = await categoryService.deleteCategory(req.params.id);
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

const getCategoryTasks = async (req, res, next) => {
  try {
    const tasks = await categoryService.getCategoryTasks(req);
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

export default {
  createCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
  getCategoryTasks,
};
