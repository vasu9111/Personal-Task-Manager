import CategoryMdl from "../../models/cetegory.js";
// cerate a categoey add
const createCategory = async (userId, categoryData) => {
  try {
    const category = new CategoryMdl({
      userId,
      name: categoryData.name,
      color: categoryData.color,
      description: categoryData.description,
    });

    await category.save();
    return { message: "category created successfully", category };
  } catch (err) {
    const error = new Error(err.message);
    throw error;
  }
};
// get user all category
const getAllCategory = async (userId) => {
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
const updateCategory = async (categoryId, categoryData) => {
  try {
    const category = await CategoryMdl.findByIdAndUpdate(
      categoryId,
      {
        name: categoryData.name,
        color: categoryData.color,
        description: categoryData.description,
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
const deleteCategory = async (categoryId) => {
  try {
    const category = await CategoryMdl.findByIdAndDelete(categoryId);
    if (!category) {
      throw new Error("CATEGORY_NOT_FOUND");
    }
    return { message: "category delele successfully" };
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
};
