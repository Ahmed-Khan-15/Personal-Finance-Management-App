import { useEffect, useState } from "react";
import getDashboard from "../services/dashboardServices";
import Card from "../components/Card";

function Dashboard() {

    const [dashboard, setDashboard] = useState(null);
    const [expandedCategories, setExpandedCategories] = useState({});

    function toggleCategory(categoryId) {
    setExpandedCategories(prev => ({
        ...prev,
        [categoryId]: !prev[categoryId]
    }));
}

    useEffect(() => {

        async function loadDashboard() {

            try {

                const data = await getDashboard();

                setDashboard(data);

            } catch (error) {
                console.error(error);
            }

        }

        loadDashboard();

    }, []);

    if (!dashboard) {
        return <h1 className="text-xl font-semibold text-slate-700">Loading...</h1>;
    }

    const hour = new Date().getHours();

    function getGreeting() {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return "Good Morning,";
  } else if (hour >= 12 && hour < 17) {
    return "Good Afternoon,";
  } else if (hour >= 17 && hour < 22) {
    return "Good Evening,";
  } else {
    return "Working Late?"; 
  }
}
   let greeting = getGreeting();

    const categoryList = dashboard.categories.map((category) => {

        const transactionList = category.transactions.map((transaction) => {

            return (
                <div key={transaction.id} className="flex flex-col gap-1 rounded-xl border border-slate-100 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div><strong className="text-slate-800">{transaction.description}</strong><p className="text-sm text-slate-500">Date: {transaction.transaction_date}</p></div>
                    <div className="sm:text-right"><p className={`font-semibold ${transaction.transaction_type === "income" ? "text-emerald-600" : "text-red-600"}`}>Amount: {transaction.amount}</p><p className="text-xs font-medium capitalize text-slate-500">{transaction.transaction_type}</p></div>
                </div>

            );

        })
        return (

            <div key={category.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between"><strong className="text-lg text-slate-800">{category.name}</strong><p className="font-semibold text-[#318097]">Total: {category.total}</p></div>
                <div className="space-y-3">{transactionList}</div>
            </div>
        );
    })

    return (
        <div className="mx-auto max-w-7xl space-y-8">
            
            <div>
                <p className="text-lg text-slate-500">
                    {greeting}
                </p>

                <h1 className="mt-1 text-3xl font-bold text-slate-800">
                    {dashboard.username} 
                </h1>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"><Card>
                <h2 className="text-sm font-medium text-slate-500">Income</h2>
                <p className="mt-3 text-2xl font-bold text-emerald-600">{dashboard.income}</p>
            </Card>

            <Card>
                <h2 className="text-sm font-medium text-slate-500">Expense</h2>
                <p className="mt-3 text-2xl font-bold text-red-400">{dashboard.expense}</p>
            </Card>

            <Card>
                <h2 className="text-sm font-medium text-slate-500">Savings</h2>
                <p className="mt-3 text-2xl font-bold text-[#318097]">{dashboard.savings}</p>
            </Card></div>

            <div className="space-y-4"><h2 className="text-xl font-bold text-slate-800">Monthly Transactions</h2>

            <div className="space-y-4" >{categoryList}</div>
            
            </div>

        </div>
    );
}

export default Dashboard;
