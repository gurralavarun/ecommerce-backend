const { Op } = require("sequelize");
const { Product, Category } = require("../models/associations");

const createProduct = async (productData) => {
    const {
        name,
        description,
        price,
        stock,
        imageUrl,
        categoryId
    } = productData;

    const category = await Category.findByPk(categoryId);

    if (!category) {
        throw new Error("Category not found");
    }

    return await Product.create({
        name,
        description,
        price,
        stock,
        imageUrl,
        categoryId
    });
};

const getAllProducts = async (query) => {
    const {
        search,
        categoryId,
        minPrice,
        maxPrice,
        page = 1,
        limit = 10
    } = query;

    const where = {};

    if (search) {
        where.name = {
            [Op.like]: `%${search}%`
        };
    }

    if (categoryId) {
        where.categoryId = categoryId;
    }

    if (minPrice || maxPrice) {
        where.price = {};

        if (minPrice) {
            where.price[Op.gte] = minPrice;
        }

        if (maxPrice) {
            where.price[Op.lte] = maxPrice;
        }
    }

    const offset = (page - 1) * limit;

    const { count, rows } = await Product.findAndCountAll({
        where,
        include: {
            model: Category,
            attributes: ["id", "name"]
        },
        order: [["createdAt", "DESC"]],
        limit: Number(limit),
        offset: Number(offset)
    });

    return {
        products: rows,
        pagination: {
            totalItems: count,
            currentPage: Number(page),
            pageSize: Number(limit),
            totalPages: Math.ceil(count / limit)
        }
    };
};

const updateProduct = async (id, productData) => {
    const product = await Product.findByPk(id);

    if (!product) {
        throw new Error("Product not found");
    }

    const {
        name,
        description,
        price,
        stock,
        imageUrl,
        categoryId
    } = productData;

    if (categoryId) {
        const category = await Category.findByPk(categoryId);

        if (!category) {
            throw new Error("Category not found");
        }
    }

    await product.update({
        name: name ?? product.name,
        description: description ?? product.description,
        price: price ?? product.price,
        stock: stock ?? product.stock,
        imageUrl: imageUrl ?? product.imageUrl,
        categoryId: categoryId ?? product.categoryId
    });

    return product;
};

const getLowStockProducts = async (threshold = 5) => {
    threshold = Number(threshold);

    if (!Number.isInteger(threshold) || threshold < 0) {
        throw new Error("Threshold must be a non-negative integer");
    }

    return await Product.findAll({
        where: {
            stock: {
                [Op.lte]: threshold
            }
        },
        include: {
            model: Category,
            attributes: ["id", "name"]
        },
        order: [["stock", "ASC"]]
    });
};

const deleteProduct = async (id) => {
    const product = await Product.findByPk(id);

    if (!product) {
        throw new Error("Product not found");
    }

    await product.destroy();
};

module.exports = {
    createProduct,
    getAllProducts,
    updateProduct,
    getLowStockProducts,
    deleteProduct
};