import categoryMld from "../../models/cetegory.js";
const createCategory = async (userId, categoryData) => {
  try {
    const category = new categoryMld({
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

export default {
  createCategory,
};
