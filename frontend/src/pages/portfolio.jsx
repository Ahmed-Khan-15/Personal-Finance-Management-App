import { useEffect, useState } from "react";
import getPortfolio from "../services/portfolioServices";

function Portfolio() {

    const [portfolio, setPortfolio] = useState(null);
    const [expandedMonths, setExpandedMonths] = useState({});
    const [filter, setFilter] = useState("3_months");

    function toggleMonth(month) {
        setExpandedMonths(prev => ({
            ...prev,
            [month]: !prev[month]
        }));
    }


    // Data Fetching



    async function loadPortfolio() {

        try {

            const data = await getPortfolio(filter);

            setPortfolio(data);

        } catch (error) {
            console.error(error);
        }

    }

    useEffect(() => {
        loadPortfolio();
    }, [filter]);

    if (!portfolio) {
        return <h1>Loading...</h1>;
    }

    const monthList = portfolio.monthlyHistory.map((month) => {
        const formattedMonth = new Date(month.month).toLocaleDateString(
            "en-US",
            {
                month: "long",
                year: "numeric"
            }
        );
        const categories = portfolio.monthlyCategories.filter(category =>
            new Date(category.month).getTime() ===
            new Date(month.month).getTime()
        );

        const incomeCategories = categories.filter(
            category => category.transaction_type === "income"
        );

        const expenseCategories = categories.filter(
            category => category.transaction_type === "expense"
        );

        const incomeCategoryList = incomeCategories.map((category) => {

            return (
                <div key={`${category.month}-${category.category}-${category.transaction_type}`}>
                    <h2>{category.category}</h2>
                    <h2>{category.total}</h2>
                    <hr />
                </div>
            );
        });
        const expenseCategoryList = expenseCategories.map((category) => {

            return (
                <div key={`${category.month}-${category.category}-${category.transaction_type}`}>
                    <h2>{category.category}</h2>
                    <h2>{category.total}</h2>
                    <hr />
                </div>
            );
        });

        return (
            <div key={month.month}>
                <h1 onClick={() => { toggleMonth(month.month) }}>{expandedMonths[month.month] ? "▼" : "▶"} {formattedMonth}</h1>
                <h2>{month.monthly_income}</h2>
                <h2>{month.monthly_expense}</h2>
                {expandedMonths[month.month] && (
                    <>
                        {incomeCategories.length > 0 && (
                            <>
                                <h2>Income Categories</h2>
                                {incomeCategoryList}
                            </>
                        )}

                        {expenseCategories.length > 0 && (
                            <>
                                <h2>Expense Categories</h2>
                                {expenseCategoryList}
                            </>
                        )}
                    </>
                )}
                <hr />
            </div>
        );
    });


    return (
        <>
            <h1>Portfolio</h1>

            <h2>Income: {portfolio.totalIncome}</h2>

            <h2>Expense: {portfolio.totalExpense}</h2>

            <h2>balance: {portfolio.balance}</h2>

            <h2>Filter</h2>

            <button onClick={() => setFilter("this_month")}>This Month</button>
            <button onClick={() => setFilter("3_months")}>3 Months</button>
            <button onClick={() => setFilter("6_months")}>6 Months</button>
            <button onClick={() => setFilter("1_year")}>1 year</button>
            <button onClick={() => setFilter("all_time")}>All Time</button>

            <h2>Monthly Income And Expense</h2>
            {monthList}
        </>
    );
}

export default Portfolio;