const pool = require("../config/db");

const { generateMonthlyTransactions } = require("../services/recurringTransactionService");

const getRecurringTransactions = async (req, res) => {

    try {

        const user_id = req.user.id;
        const result = await pool.query("SELECT * FROM recurring_transactions WHERE user_id = $1", [user_id]);
        res.json(result.rows);

    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "something went wrong"
        });
    }

};

const generateRecurringTransactions = async (req, res) => {

    try {
        const user_id = req.user.id;

        const result = await pool.query("SELECT * FROM recurring_transactions WHERE user_id = $1", [user_id]);

        let totalGenerated = 0;

         
        for (let i = 0; i < result.rows.length; i++) {
            let recurringTransaction = result.rows[i];
            
            if(recurringTransaction.repeat_interval === "monthly"){
                const generatedCount = await generateMonthlyTransactions(recurringTransaction);
                totalGenerated = totalGenerated + generatedCount;
            }
        }

        res.status(200).json({
            message: "Created Recurring Transactions Successfully!",
            totalGenerated
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "something went wrong"
        });
}
};


const getRecurringTransactionById = async (req, res) => {

    try {

        const user_id = req.user.id;
        const { id } = req.params;

        const recurringTransactionId = Number(id);

        if (Number.isNaN(recurringTransactionId)) {
            return res.status(400).json({
                message: "Invalid recurring transaction ID!"
            });
        }

        const result = await pool.query("SELECT * FROM recurring_transactions WHERE id = $1 AND user_id = $2;", [recurringTransactionId, user_id]);
        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "Recurring transaction not found"
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
const createRecurringTransaction = async (req, res) => {

    try {

        const user_id = req.user.id;

        const {
            category_id,
            repeat_interval,
            description,
            amount,
            transaction_type,
            start_date,
            end_date } = req.body;


        const query = `
            INSERT INTO recurring_transactions (
                user_id,
                category_id,
                repeat_interval,
                description,
                amount,
                transaction_type,
                start_date,
                end_date
                )
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING *;
                `;
        const values = [
            user_id,
            category_id,
            repeat_interval,
            description,
            amount,
            transaction_type,
            start_date,
            end_date
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
const updateRecurringTransaction = async (req, res) => {

    try {

        const user_id = req.user.id;
        const { id } = req.params;

        const recurringTransactionId = Number(id);

        if (Number.isNaN(recurringTransactionId)) {
            return res.status(400).json({
                message: "Invalid recurring transaction ID!"
            });
        }


        const {
            category_id,
            repeat_interval,
            description,
            amount,
            transaction_type,
            start_date,
            end_date } = req.body;

        const query = `
            UPDATE recurring_transactions
            SET
                category_id = $1, 
                repeat_interval = $2, 
                description = $3, 
                amount = $4, 
                transaction_type = $5, 
                start_date = $6, 
                end_date = $7 

            WHERE id = $8 AND user_id = $9
            RETURNING *;
                `;
        const values = [
            category_id,
            repeat_interval,
            description,
            amount,
            transaction_type,
            start_date,
            end_date,
            recurringTransactionId,
            user_id
        ];
        const result = await pool.query(query, values);
        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "Recurring transaction not found"
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
const deleteRecurringTransaction = async (req, res) => {

    try {

        const user_id = req.user.id;
        const { id } = req.params;

        const recurringTransactionId = Number(id);

        if (Number.isNaN(recurringTransactionId)) {
            return res.status(400).json({
                message: "Invalid recurring transaction ID!"
            });
        }


        const query = `
        DELETE FROM recurring_transactions
        WHERE id = $1 AND user_id = $2
        RETURNING *;`;

        const value = [
            recurringTransactionId,
            user_id
        ];
        const result = await pool.query(query, value);
        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "Recurring transaction not found"
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
    getRecurringTransactions,
    createRecurringTransaction,
    getRecurringTransactionById,
    updateRecurringTransaction,
    deleteRecurringTransaction,
    generateRecurringTransactions
};