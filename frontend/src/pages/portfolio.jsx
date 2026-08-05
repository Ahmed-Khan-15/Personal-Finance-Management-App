import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import getPortfolio from "../services/portfolioServices";
import CountUp from "../components/CountUp";

function Portfolio() {
    const [portfolio, setPortfolio] = useState(null);
    const [expandedMonths, setExpandedMonths] = useState({});
    const [filter, setFilter] = useState("3_months");

    function toggleMonth(month) {
        setExpandedMonths((prev) => ({ ...prev, [month]: !prev[month] }));
    }

    useEffect(() => {
        async function loadPortfolio() {
            try {
                setPortfolio(await getPortfolio(filter));
            } catch (error) {
                console.error(error);
            }
        }

        loadPortfolio();
    }, [filter]);

    if (!portfolio) {
        return <h1 className="text-xl font-semibold text-slate-700">Loading...</h1>;
    }

    const monthList = portfolio.monthlyHistory.map((month) => {
        const formattedMonth = new Date(month.month).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
        });
        const categories = portfolio.monthlyCategories.filter(
            (category) => new Date(category.month).getTime() === new Date(month.month).getTime(),
        );
        const incomeCategories = categories.filter((category) => category.transaction_type === "income");
        const expenseCategories = categories.filter((category) => category.transaction_type === "expense");

        const categoryRows = (items, type) => items.map((category) => (
            <div key={`${category.month}-${category.category}-${type}`} className={`flex items-center justify-between border-b py-2 last:border-0 ${type === "income" ? "border-emerald-100" : "border-red-100"}`}>
                <span className="text-sm font-medium text-slate-700">{category.category}</span>
                <span className={`text-sm font-semibold ${type === "income" ? "text-emerald-700" : "text-red-700"}`}>{category.total}</span>
            </div>
        ));

        const isExpanded = Boolean(expandedMonths[month.month]);

        return (
            <div key={month.month} className="portfolio-month-card rounded-2xl border shadow-sm">
                <button
                    type="button"
                    onClick={() => toggleMonth(month.month)}
                    aria-expanded={isExpanded}
                    className="flex w-full items-center justify-between p-5 text-left"
                >
                    <div>
                        <h3 className="text-lg font-semibold">{formattedMonth}</h3>
                        <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm">
                            <span className="text-emerald-600">Income: {month.monthly_income}</span>
                            <span className="text-red-600">Expense: {month.monthly_expense}</span>
                        </div>
                    </div>
                    <ChevronDown aria-hidden="true" className={`shrink-0 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
                </button>

                <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
                    <div className="space-y-5 border-t p-5">
                        {incomeCategories.length > 0 && <section><h2 className="mb-2 text-sm font-semibold text-emerald-700">Income Categories</h2>{categoryRows(incomeCategories, "income")}</section>}
                        {expenseCategories.length > 0 && <section><h2 className="mb-2 text-sm font-semibold text-red-700">Expense Categories</h2>{categoryRows(expenseCategories, "expense")}</section>}
                    </div>
                </div>
            </div>
        );
    });

    const filters = [["this_month", "This Month"], ["3_months", "3 Months"], ["6_months", "6 Months"], ["1_year", "1 Year"], ["all_time", "All Time"]];

    return (
        <div className="portfolio-page mx-auto max-w-6xl space-y-8">
            <h1 className="page-title text-2xl font-bold tracking-tight sm:text-3xl">Portfolio</h1>

            <div className="grid gap-4 sm:grid-cols-3">
                <div className="portfolio-summary-card rounded-2xl border p-5 shadow-sm"><h2 className="text-sm font-medium">Income</h2><p className="mt-2 text-xl font-bold text-[oklch(0.87_0.18_164.8)]">Rs. <CountUp to={Number(portfolio.totalIncome)} separator="," duration={.05} /></p></div>
                <div className="portfolio-summary-card rounded-2xl border p-5 shadow-sm"><h2 className="text-sm font-medium">Expense</h2><p className="mt-2 text-xl font-bold text-[oklch(0.82_0.13_18.77)]">Rs. <CountUp to={Number(portfolio.totalExpense)} separator="," duration={.05} /></p></div>
                <div className="portfolio-summary-card rounded-2xl border p-5 shadow-sm"><h2 className="text-sm font-medium">Balance</h2><p className="mt-2 text-xl font-bold text-[#6ad4f3]">Rs. <CountUp to={Number(portfolio.balance)} separator="," duration={.05} /></p></div>
            </div>

            <div className="space-y-3"><h2 className="text-sm font-semibold text-slate-700">Filter</h2><div className="flex flex-wrap gap-2">
                {filters.map(([value, label]) => <button key={value} className={`rounded-xl px-4 py-2 text-sm font-medium transition ${filter === value ? "bg-[#318097] text-white" : "bg-white text-slate-600 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"}`} onClick={() => setFilter(value)}>{label}</button>)}
            </div></div>

            <div className="space-y-4"><h2 className="text-xl font-bold text-slate-800">Monthly Income and Expense</h2>{monthList}</div>
        </div>
    );
}

export default Portfolio;
