const pool = require("../config/db");

const getTransactions = async (req, res) => {
    try {

        const user_id = req.user.id;

        const result = await pool.query("SELECT * FROM transactions WHERE user_id = $1", [user_id]);
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
        const user_id = req.user.id;
        const result = await pool.query("SELECT * FROM transactions WHERE id = $1 AND user_id = $2;", [transactionId, user_id]);
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

        const user_id = req.user.id;

        const {
            category_id,
            recurring_transaction_id,
            description,
            amount,
            transaction_type } = req.body;



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
            transaction_type
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

        const user_id = req.user.id;

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

        const query = `
            UPDATE transactions
            SET
                category_id = $1,
                amount = $2,
                description = $3,
                recurring_transaction_id = $4,
                transaction_type = $5
                
            WHERE id = $6 AND user_id = $7
            RETURNING *;
                `;
        const values = [
            category_id,
            amount,
            description,
            recurring_transaction_id,
            transaction_type,
            transactionId,
            user_id
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


const deleteTransaction = async (req, res) => {

    try {


        const user_id = req.user.id;

        const { id } = req.params;

        const transactionId = Number(id);

        if (Number.isNaN(transactionId)) {
            return res.status(400).json({
                message: "Invalid transaction ID"
            });
        }


        const query = `
        DELETE FROM transactions
        WHERE id = $1 AND user_id = $2
        RETURNING *;`;

        const value = [
            transactionId,
            user_id
        ];
        const result = await pool.query(query, value);
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



module.exports = {
    getTransactions,
    createTransaction,
    getTransactionById,
    updateTransaction,
    deleteTransaction
};