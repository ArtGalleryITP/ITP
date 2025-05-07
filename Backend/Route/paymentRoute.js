const express = require("express");
const router = express.Router();
const {
    createPayment,
    getAllPayments,
    getPaymentById,
    updatePaymentStatus,
    deletePayment
} = require("../Controller/paymentController");

// Create a new payment
router.post("/", createPayment);

// Get all payments
router.get("/", getAllPayments);

// Get payment by ID
router.get("/:id", getPaymentById);

// Update payment status
router.put("/:id", updatePaymentStatus);

// Delete payment
router.delete("/:id", deletePayment);

module.exports = router; 