const pool = require("../config/db");

const generateMonthlyTransactions = async (recurringTransaction) => {

    const {
        id,
        user_id,
        category_id,
        description,
        amount,
        transaction_type,
        start_date,
        end_date
    } = recurringTransaction;

    const startDate = new Date(start_date);
    const today = new Date();

    let currentDate = new Date(startDate);
    let generatedCount = 0;

    while (currentDate <= today) {

        if (end_date && currentDate > new Date(end_date)) {
            break;
        }

        const result = await pool.query(
            `INSERT INTO transactions
            (
                user_id,
                category_id,
                recurring_transaction_id,
                description,
                amount,
                transaction_type,
                transaction_date,
                recurrence_date
            )
            VALUES ($1,$2,$3,$4,$5,$6,$7,$7)
            ON CONFLICT (recurring_transaction_id, recurrence_date)
            DO NOTHING
            RETURNING *`,
            [
                user_id,
                category_id,
                id,
                description,
                amount,
                transaction_type,
                currentDate
            ]
        );

        if (result.rowCount > 0) {
            generatedCount++;
        }

        currentDate.setMonth(currentDate.getMonth() + 1);
    }

    return generatedCount;
};

module.exports = {
    generateMonthlyTransactions
};