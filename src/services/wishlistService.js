const {
    WishlistItem,
    Product
} = require("../models/associations");

const addToWishlist = async (userId, productId) => {
    const product = await Product.findByPk(productId);

    if (!product) {
        throw new Error("Product not found");
    }

    const existingItem = await WishlistItem.findOne({
        where: {
            userId,
            productId
        }
    });

    if (existingItem) {
        throw new Error("Product already exists in wishlist");
    }

    return await WishlistItem.create({
        userId,
        productId
    });
};

const getWishlist = async (userId) => {
    return await WishlistItem.findAll({
        where: { userId },
        include: {
            model: Product,
            attributes: ["id", "name", "description", "price", "stock", "imageUrl"]
        },
        order: [["createdAt", "DESC"]]
    });
};

const removeFromWishlist = async (userId, productId) => {
    const item = await WishlistItem.findOne({
        where: {
            userId,
            productId
        }
    });

    if (!item) {
        throw new Error("Product not found in wishlist");
    }

    await item.destroy();
};

module.exports = {
    addToWishlist,
    getWishlist,
    removeFromWishlist
};