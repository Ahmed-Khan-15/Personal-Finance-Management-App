const authMiddleware = require("../middleware/authMiddleware");
const express = require("express");

const router = express.Router();

const { getTransactions ,
        createTransaction,
        getTransactionById,
        updateTransaction,
        deleteTransaction
} = require("../controllers/transactionControllers");

router.get("/", authMiddleware ,getTransactions);
router.get("/:id", authMiddleware ,getTransactionById);

router.post("/", authMiddleware ,createTransaction);
router.put("/:id", authMiddleware ,updateTransaction);

router.delete("/:id", authMiddleware ,deleteTransaction);

module.exports = router;