const pool = require("../config/db");

const getPortfolio = async (req, res) => {

    try {

        const user_id = req.user.id;
        const totalIncomeQuery = `SELECT COALESCE(SUM(amount), 0) AS income
                             FROM transactions WHERE user_id = $1 
                             AND transaction_type = 'income';`;

        const totalExpenseQuery =`SELECT COALESCE(SUM(amount), 0) AS expense
                             FROM transactions WHERE user_id = $1 
                             AND transaction_type = 'expense';`;

        const monthlyHistoryQuery = `SELECT DATE_TRUNC('month',transaction_date) AS month,
                             COALESCE(SUM( CASE WHEN transaction_type = 'income' THEN amount Else 0 END), 0) As monthly_income,
                             COALESCE(SUM( CASE WHEN transaction_type = 'expense' THEN amount Else 0 END), 0) As monthly_expense
                             FROM transactions WHERE user_id = $1 
                             GROUP BY DATE_TRUNC('month', transaction_date)
                             ORDER BY month ASC`;

        const income = await pool.query(totalIncomeQuery, [user_id]);
        const expense = await pool.query(totalExpenseQuery, [user_id]);
        const monthlyHistory = await pool.query(monthlyHistoryQuery, [user_id]);

        const totalIncome = Number(income.rows[0].income) ;
        const totalExpense = Number(expense.rows[0].expense) ;

        const balance = totalIncome - totalExpense;
        res.json({
            totalIncome,
            totalExpense,
            balance,
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