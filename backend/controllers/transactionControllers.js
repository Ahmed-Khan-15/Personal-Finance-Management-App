const pool = require("../config/db");

const getTransactions = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM transactions");
        res.json(result.rows);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "something went wrong"
        });
    }
};

const getTransactionById = async (req, res) => {
    const { id } = req.params;

    const transactionId = Number(id);

    if (Number.isNaN(transactionId)) {
        return res.status(400).json({
            message: "Invalid transaction ID"
        });
    }

    try {
        const result = await pool.query("SELECT * FROM transactions WHERE id = $1;", [transactionId]);
        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "Transaction not found"
            });
        }

        res.json(result.rows[0]);

    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "something went wrong"
        });
    }

};

const createTransaction = async (req, res) => {

    try {

        const { user_id,
            category_id,
            recurring_transaction_id,
            description,
            amount,
            transaction_type } = req.body;

        if (
            user_id === undefined ||
            category_id === undefined ||
            amount === undefined ||
            !transaction_type
        ) {
            return res.status(400).json({
                message: "Missing required fields"
            });
        }

        const normalizedTransactionType = transaction_type?.toLowerCase();

        if (typeof amount !== "number") {
            return res.status(400).json({
                message: "Amount must be a number"
            });
        }
        if (normalizedTransactionType !== "income" && normalizedTransactionType !== "expense") {
            return res.status(400).json({
                message: "invalid transaction type!"
            });
        }
        const query = `
            INSERT INTO transactions (
                user_id,
                category_id,
                recurring_transaction_id,
                description,
                amount,
                transaction_type
                )
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING *;
                `;
        const values = [
            user_id,
            category_id,
            recurring_transaction_id,
            description,
            amount,
            normalizedTransactionType
        ];
        const result = await pool.query(query, values);
        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "something went wrong"
        });
    }
};


const updateTransaction = async (req, res) => {

    try {
        const { id } = req.params;

        const transactionId = Number(id);

        if (Number.isNaN(transactionId)) {
            return res.status(400).json({
                message: "Invalid transaction ID"
            });
        }


        const {
            category_id,
            amount,
            description,
            recurring_transaction_id,
            transaction_type
        } = req.body;


        if (
            category_id === undefined ||
            amount === undefined ||
            !transaction_type
        ) {
            return res.status(400).json({
                message: "Missing required fields"
            });
        }
        const normalizedTransactionType = transaction_type?.toLowerCase();
        if (typeof amount !== "number") {
            return res.status(400).json({
                message: "Amount must be a number"
            });
        }
        if (normalizedTransactionType !== "income" && normalizedTransactionType !== "expense") {
            return res.status(400).json({
                message: "invalid transaction type!"
            });
        }

        const query = `
            UPDATE transactions
            SET
                category_id = $1,
                amount = $2,
                description = $3,
                recurring_transaction_id = $4,
                transaction_type = $5
                
            WHERE id = $6
            RETURNING *;
                `;
        const values = [
            category_id,
            amount,
            description,
            recurring_transaction_id,
            normalizedTransactionType,
            transactionId
        ];
        const result = await pool.query(query, values);
        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "Transaction not found"
            });
        }
        res.status(200).json(result.rows[0]);

    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "something went wrong"
        });
    }

};


const deleteTransaction = async (req,res)=>{

    const { id } = req.params;

    const transactionId = Number(id);

    if (Number.isNaN(transactionId)) {
        return res.status(400).json({
            message: "Invalid transaction ID"
        });
    }

    try{

        const query = `
        DELETE FROM transactions
        WHERE id = $1
        RETURNING*;`;

        const value = [
            transactionId
        ];
        const result = await pool.query(query,value);
        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "Transaction not found"
            });
        }
        res.status(200).json(result.rows[0]);
    }
    catch(error){
        console.error(error);
        res.status(500).json({
            message: "something went wrong"
        });
    }

};



module.exports = {
    getTransactions,
    createTransaction,
    getTransactionById,
    updateTransaction,
    deleteTransaction
};