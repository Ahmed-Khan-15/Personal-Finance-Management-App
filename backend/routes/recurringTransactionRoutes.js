const authMiddleware = require("../middleware/authMiddleware");
const validateRecurringTransaction = require("../middleware/validation/recurringTransactionValidation");
const express = require("express");

const router = express.Router();

const { getRecurringTransactions,
    createRecurringTransaction,
    getRecurringTransactionById,
    updateRecurringTransaction,
    deleteRecurringTransaction
} = require("../controllers/recurringTransactionControllers");

router.get("/", authMiddleware, getRecurringTransactions);
router.get("/:id", authMiddleware, getRecurringTransactionById);

router.post("/", authMiddleware, validateRecurringTransaction, createRecurringTransaction);
router.put("/:id", authMiddleware, validateRecurringTransaction, updateRecurringTransaction);

router.delete("/:id", authMiddleware, deleteRecurringTransaction);

module.exports = router;