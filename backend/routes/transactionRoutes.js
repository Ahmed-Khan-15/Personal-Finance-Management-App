const express = require("express");

const router = express.Router();

const { getTransactions ,
        createTransaction,
        getTransactionById,
        updateTransaction,
        deleteTransaction
} = require("../controllers/transactionControllers");

router.get("/", getTransactions);
router.get("/:id", getTransactionById);

router.post("/", createTransaction);
router.put("/:id", updateTransaction);

router.delete("/:id", deleteTransaction);

module.exports = router;