import CategoryMdl from "../../models/cetegory.js";
import TaskMdl from "../../models/task.js";
// cerate a categoey add
const createCategory = async (req) => {
  const userId = req.user._id;
  const { name, color, description } = req.body;
  try {
    const category = new CategoryMdl({
      userId,
      name: name,
      color: color,
      description: description,
    });

    await category.save();
    return { message: "category created successfully", category };
  } catch (err) {
    const error = new Error(err.message);
    throw error;
  }
};
// get user all category
const getAllCategory = async (req) => {
  const userId = req.user._id;
  try {
    const category = await CategoryMdl.find({ userId });
    if (category.length === 0) {
      const error = new Error("CATEGORY_NOT_FOUND");
      throw error;
    }
    return category;
  } catch (err) {
    const error = new Error(err.message);
    throw error;
  }
};
// update category
const updateCategory = async (req) => {
  const categoryId = req.params.id;
  const { name, color, description } = req.body;
  try {
    const category = await CategoryMdl.findByIdAndUpdate(
      categoryId,
      {
        name,
        color,
        description,
      },
      { new: true }
    );
    if (!category) {
      throw new Error("CATEGORY_NOT_FOUND");
    }
    return { message: "categoey Update successfully", category };
  } catch (err) {
    const error = new Error(err.message);
    throw error;
  }
};

// category delete
const deleteCategory = async (req) => {
  const categoryId = req.params.id;
  try {
    const category = await CategoryMdl.findByIdAndDelete(categoryId);
    if (!category) {
      throw new Error("CATEGORY_NOT_FOUND");
    }
    return { message: "category delete successfully" };
  } catch (err) {
    const error = new Error(err.message);
    throw error;
  }
};
const getCategoryTasks = async (req) => {
  const categoryId = req.params.id;
  try {
    const allTasks = await TaskMdl.find({ category: categoryId }).populate({
      path: "category",
      select: "userId",
    });
    if (!allTasks) {
      throw new Error("CATEGORY_NOT_FOUND");
    }
    const tasks = allTasks.filter((task) => {
      return task.category.userId.toString() === req.user._id;
    });
    if (tasks.length === 0) {
      throw new Error("THIS_IS_NOT_A_CATEGORY");
    }
    return tasks;
  } catch (err) {
    const error = new Error(err.message);
    throw error;
  }
};
export default {
  createCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
  getCategoryTasks,
};
