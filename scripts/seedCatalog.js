/* Safe, idempotent catalog seeder. It only creates missing categories/products. */
require("dotenv").config();
const sequelize = require("../src/config/database");
const { Category, Product } = require("../src/models/associations");

const catalog = [
  { category: "Electronics & Gadgets", description: "Electronic devices and accessories", products: [
    ["Wireless Headphones Pro", "Comfortable over-ear headphones with immersive sound and all-day battery.", 4999, 24, "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80"],
    ["Smart Watch Active", "Fitness and notification smartwatch with a bright touchscreen display.", 5999, 18, "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80"],
    ["Bluetooth Speaker Mini", "Portable waterproof speaker with rich, room-filling audio.", 2499, 35, "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=80"],
    ["Mechanical Keyboard", "Compact tactile keyboard with durable keys and white backlighting.", 4299, 16, "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80"]
  ]},
  { category: "Mobiles & Accessories", description: "Phones, charging and everyday mobile essentials", products: [
    ["Power Bank 20000mAh", "High-capacity fast-charging power bank with dual USB output.", 2199, 28, "https://images.unsplash.com/photo-1609592424824-9f7ab98b5145?auto=format&fit=crop&w=900&q=80"],
    ["Fast Charging Adapter", "Compact 30W USB-C wall adapter for compatible devices.", 1199, 50, "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=900&q=80"],
    ["Braided USB-C Cable", "Durable 1.5 metre charging and data cable.", 499, 80, "https://images.unsplash.com/photo-1591290619762-cd3e1c40e4e1?auto=format&fit=crop&w=900&q=80"]
  ]},
  { category: "Fashion", description: "Everyday fashion and travel accessories", products: [
    ["Casual Canvas Sneakers", "Versatile lightweight sneakers for everyday comfort.", 2799, 22, "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80"],
    ["Classic Backpack", "Water-resistant backpack with padded laptop compartment.", 1899, 30, "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80"],
    ["Polarized Sunglasses", "UV-protective polarized sunglasses with a lightweight frame.", 1499, 26, "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80"]
  ]},
  { category: "Home & Lifestyle", description: "Useful additions for home and daily life", products: [
    ["Adjustable Desk Lamp", "Dimmable LED desk lamp with focused, comfortable light.", 1799, 19, "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80"],
    ["Insulated Water Bottle", "Leak-proof stainless steel bottle that keeps drinks cold.", 899, 42, "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=80"],
    ["Ceramic Coffee Mug", "Minimal ceramic mug for coffee, tea and hot chocolate.", 599, 45, "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=80"]
  ]}
];

async function seedCatalog() {
  await sequelize.authenticate();
  let addedCategories = 0; let addedProducts = 0;
  for (const group of catalog) {
    const [category, created] = await Category.findOrCreate({ where: { name: group.category }, defaults: { description: group.description } });
    if (created) addedCategories += 1;
    for (const [name, description, price, stock, imageUrl] of group.products) {
      const existing = await Product.findOne({ where: { name } });
      if (!existing) { await Product.create({ name, description, price, stock, imageUrl, categoryId: category.id }); addedProducts += 1; }
    }
  }
  console.log(`Catalog seed complete: ${addedCategories} category/categories and ${addedProducts} product(s) added.`);
}
seedCatalog().catch((error) => { console.error("Catalog seeding failed:", error.message); process.exitCode = 1; }).finally(() => sequelize.close());
