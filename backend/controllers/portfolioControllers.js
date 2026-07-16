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
                             COALESCE(SUM( CASE WHEN transaction_type = 'income' THEN amount Else 0 END), 0) As months_income,
                             COALESCE(SUM( CASE WHEN transaction_type = 'expense' THEN amount Else 0 END), 0) As months_expense
                             FROM transactions WHERE user_id = $1 
                             GROUP BY DATE_TRUNC('month', transaction_date)
                             ORDER BY month ASC`;

        const totalIncome = await pool.query(totalIncomeQuery, [user_id]);
        const totalExpense = await pool.query(totalExpenseQuery, [user_id]);
        const monthlyHistory = await pool.query(monthlyHistoryQuery, [user_id]);

        const income = Number(totalIncome.rows[0].income) ;
        const expense = Number(totalExpense.rows[0].expense) ;

        const balance = income - expense;
        res.json({
            income,
            expense,
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