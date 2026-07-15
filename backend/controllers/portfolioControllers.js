const pool = require("../config/db");

const getPortfolio = async (req, res) => {

    try {

        const user_id = req.user.id;
        const totalIncomeQuery = `SELECT COALESCE(SUM(amount), 0) AS income
                             FROM transactions WHERE user_id = $1 
                             AND transaction_type = 'income' 
                             AND transaction_date >= DATE_TRUNC('month', CURRENT_DATE)
                             AND transaction_date < DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month';`;

        const totalExpenseQuery =`SELECT COALESCE(SUM(amount), 0) AS expense
                             FROM transactions WHERE user_id = $1 
                             AND transaction_type = 'expense' 
                             AND transaction_date >= DATE_TRUNC('month', CURRENT_DATE)
                             AND transaction_date < DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month';`;

        const monthlyHistoryQuery = `SELECT DATE_TRUNC("month",transaction_date) AS month,
                             COALESCE(SUM(amount) WHEN transaction_type = 'income' THEN amount Else 0) As months_income,
                             COALESCE(SUM(amount) WHEN transaction_type = 'expense' THEN amount Else 0) As months_expense,
                             FROM transactions WHERE user_id = $1 
                             AND transaction_date >= DATE_TRUNC('month', CURRENT_DATE)
                             AND transaction_date < DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month';`;

        const totalIncome = await pool.query(totalIncomeQuery, [user_id]);
        const totalExpense = await pool.query(totalExpenseQuery, [user_id]);
        const monthlyHistory = await pool.query(monthlyHistoryQuery, [user_id]);


        res.json({
            totalIncome: totalIncome.rows[0].monthly_income,
            totalExpense: totalExpense.rows[0].monthly_expense,
            monthlyHistory: monthlyHistory.rows
        });



    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "something went wrong"
        });
    }

};

module.exports = {
    getPortfolio
};