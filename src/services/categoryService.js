const { Category } = require("../models/associations");

const createCategory = async (categoryData) => {
    const { name, description } = categoryData;

    const existingCategory = await Category.findOne({
        where: { name }
    });

    if (existingCategory) {
        throw new Error("Category already exists");
    }

    return await Category.create({
        name,
        description
    });
};

const getAllCategories = async () => {
    return await Category.findAll({
        order: [["name", "ASC"]]
    });
};

const getCategoryById = async (id) => {
    const category = await Category.findByPk(id);

    if (!category) {
        throw new Error("Category not found");
    }

    return category;
};

const updateCategory = async (id, categoryData) => {
    const category = await Category.findByPk(id);

    if (!category) {
        throw new Error("Category not found");
    }

    const { name, description } = categoryData;

    if (name && name !== category.name) {
        const existingCategory = await Category.findOne({
            where: { name }
        });

        if (existingCategory) {
            throw new Error("Category name already exists");
        }
    }

    await category.update({
        name: name ?? category.name,
        description: description ?? category.description
    });

    return category;
};

const deleteCategory = async (id) => {
    const category = await Category.findByPk(id);

    if (!category) {
        throw new Error("Category not found");
    }

    await category.destroy();

    return category;
};

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};