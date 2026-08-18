require("dotenv").config();

const express = require("express");
const sequelize = require("./src/config/database");

const {
    Role,
    User,
    Category,
    Product,
    Cart,
    CartItem,
    WishlistItem
} = require("./src/models/associations");
const seedRoles = require("./src/config/seedRoles");

const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const categoryRoutes = require("./src/routes/categoryRoutes");
const productRoutes = require("./src/routes/productRoutes");
const cartRoutes = require("./src/routes/cartRoutes");
const wishlistRoutes = require("./src/routes/wishlistRoutes");

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.json({
        message: "E-Commerce Backend API is running"
    });
});

app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);

    try {
        await sequelize.authenticate();
        console.log("MySQL database connected successfully");

        await sequelize.sync();
        console.log("Database tables synchronized");

        await seedRoles();
    } catch (error) {
        console.error("Database connection failed:", error.message);
    }
});