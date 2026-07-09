const express = require("express");

const router = express.Router();

const { getTransactions ,
        createTransaction,
        getTransactionById
} = require("../controllers/transactionControllers");

router.get("/", getTransactions);
router.get("/:id", getTransactionById);

router.post("/", createTransaction);

module.exports = router;