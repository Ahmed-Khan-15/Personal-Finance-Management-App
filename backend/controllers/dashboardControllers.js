const pool = require("../config/db");

const getDashboard = async (req, res) => {

    try {

        const user_id = req.user.id;
        const incomeQuery = `SELECT COALESCE(SUM(amount), 0) AS monthly_income
                             FROM transactions WHERE user_id = $1 
                             AND transaction_type = 'income' 
                             AND transaction_date >= DATE_TRUNC('month', CURRENT_DATE)
                             AND transaction_date < DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month';`;

        const expenseQuery =`SELECT COALESCE(SUM(amount), 0) AS monthly_expense
                             FROM transactions WHERE user_id = $1 
                             AND transaction_type = 'expense' 
                             AND transaction_date >= DATE_TRUNC('month', CURRENT_DATE)
                             AND transaction_date < DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month';`;

        const recentTransactionsQuery = `SELECT * FROM transactions WHERE user_id = $1 
                             AND transaction_date >= DATE_TRUNC('month', CURRENT_DATE)
                             AND transaction_date < DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month';`;

        const income = await pool.query(incomeQuery, [user_id]);
        const expense = await pool.query(expenseQuery, [user_id]);
        const recentTransactions = await pool.query(recentTransactionsQuery, [user_id]);


        res.json({
            income: income.rows[0].monthly_income,
            expense: expense.rows[0].monthly_expense,
            recentTransactions: recentTransactions.rows
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
    getDashboard
};