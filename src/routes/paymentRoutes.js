const express = require("express");

const authenticateToken = require("../middleware/authMiddleware");
const { processPayment } = require("../controllers/paymentController");

const router = express.Router();

router.post(
    "/",
    authenticateToken,
    processPayment
);

module.exports = router;