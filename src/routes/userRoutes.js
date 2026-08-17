const express = require("express");

const authenticateToken = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");

const {
    getProfile,
    getAdminTest
} = require("../controllers/userController");

const router = express.Router();

router.get("/profile", authenticateToken, getProfile);

router.get(
    "/admin-test",
    authenticateToken,
    authorizeRole("ADMIN"),
    getAdminTest
);

module.exports = router;