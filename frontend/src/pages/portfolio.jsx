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
        return <h1 className="text-xl font-semibold text-slate-700">Loading...</h1>;
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
                <div key={`${category.month}-${category.category}-${category.transaction_type}`} className="flex items-center justify-between border-b border-emerald-100 py-2 last:border-0">
                    <h2 className="text-sm font-medium text-slate-700">{category.category}</h2>
                    <h2 className="text-sm font-semibold text-emerald-700">{category.total}</h2>
                </div>
            );
        });
        const expenseCategoryList = expenseCategories.map((category) => {

            return (
                <div key={`${category.month}-${category.category}-${category.transaction_type}`} className="flex items-center justify-between border-b border-red-100 py-2 last:border-0">
                    <h2 className="text-sm font-medium text-slate-700">{category.category}</h2>
                    <h2 className="text-sm font-semibold text-red-700">{category.total}</h2>
                </div>
            );
        });

        return (
            <div key={month.month} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
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
        <div className="mx-auto max-w-6xl space-y-8">
            <div><h1 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">Portfolio</h1></div>

            <div className="grid gap-4 sm:grid-cols-3"><div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h2 className="text-sm font-medium text-slate-500">Income</h2><p className="mt-2 text-xl font-bold text-emerald-600">{portfolio.totalIncome}</p></div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h2 className="text-sm font-medium text-slate-500">Expense</h2><p className="mt-2 text-xl font-bold text-red-600">{portfolio.totalExpense}</p></div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h2 className="text-sm font-medium text-slate-500">balance</h2><p className="mt-2 text-xl font-bold text-[#318097]">{portfolio.balance}</p></div></div>

            <div className="space-y-3"><h2 className="text-sm font-semibold text-slate-700">Filter</h2><div className="flex flex-wrap gap-2">

            <button className={`rounded-xl px-4 py-2 text-sm font-medium transition ${filter === "this_month" ? "bg-[#318097] text-white" : "bg-white text-slate-600 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"}`} onClick={() => setFilter("this_month")}>This Month</button>
            <button className={`rounded-xl px-4 py-2 text-sm font-medium transition ${filter === "3_months" ? "bg-[#318097] text-white" : "bg-white text-slate-600 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"}`} onClick={() => setFilter("3_months")}>3 Months</button>
            <button className={`rounded-xl px-4 py-2 text-sm font-medium transition ${filter === "6_months" ? "bg-[#318097] text-white" : "bg-white text-slate-600 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"}`} onClick={() => setFilter("6_months")}>6 Months</button>
            <button className={`rounded-xl px-4 py-2 text-sm font-medium transition ${filter === "1_year" ? "bg-[#318097] text-white" : "bg-white text-slate-600 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"}`} onClick={() => setFilter("1_year")}>1 year</button>
            <button className={`rounded-xl px-4 py-2 text-sm font-medium transition ${filter === "all_time" ? "bg-[#318097] text-white" : "bg-white text-slate-600 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"}`} onClick={() => setFilter("all_time")}>All Time</button></div></div>

            <div className="space-y-4"><h2 className="text-xl font-bold text-slate-800">Monthly Income And Expense</h2>{monthList}</div>
        </div>
    );
}

export default Portfolio;
