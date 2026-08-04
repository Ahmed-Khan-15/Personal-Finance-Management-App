import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    getTransactions,
    deleteTransactions,
} from "../services/transactionServices";

function Transactions() {
    const navigate = useNavigate();

    // State
    const [deleteMode, setDeleteMode] = useState(false);
    const [selectedTransactions, setSelectedTransactions] = useState([]);
    const [transactions, setTransactions] = useState(null);
    const [filter, setFilter] = useState("this_month");

    // Data Fetching
    async function loadTransactions() {
        try {
            const data = await getTransactions(filter);
            setSelectedTransactions([]);
            setTransactions(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        loadTransactions();
    }, [filter]);

    // Event Handlers
   
    function handleCheckbox(id) {
        if (selectedTransactions.includes(id)) {
            let arr = selectedTransactions;
            let arr2 = [];
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] === id) {
                    continue;
                }
                arr2.push(arr[i]);
            }
            setSelectedTransactions(arr2);
        } else {
            setSelectedTransactions([...selectedTransactions, id]);
        }
    }

    // Early Return for Loading State
    if (!transactions) {
        return <h1 className="text-xl font-semibold text-slate-700">Loading...</h1>;
    }

    // Render Helpers
    const monthList = transactions.months.map((month) => {
        const transactionList = month.transactions.map((transaction) => {
            return (
                <div key={transaction.id} className="flex flex-col gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div><strong className="text-slate-800">{transaction.description}</strong>
                    <p>
                        {transaction.transaction_type === "income"
                            ? `+${transaction.amount}`
                            : `-${transaction.amount}`}
                    </p>
                    <p>{transaction.transaction_type}</p>
                    <p>
                        Date:{" "}
                        {new Date(transaction.transaction_date).toLocaleDateString()}</p></div>
                    {deleteMode ? (
                        <input className="h-4 w-4 rounded border-slate-300 text-red-600 focus:ring-red-500"
                            type="checkbox"
                            checked={selectedTransactions.includes(transaction.id)}
                            onChange={() => handleCheckbox(transaction.id)}
                        />
                    ) : (
                        
            <button onClick={() => navigate(`/edit-transaction/${transaction.id}`)}>
                Edit Transaction</button>
                    )}
                </div>
            );
        });

        return (
            <div key={month.month} className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h1 className="text-lg font-semibold text-slate-800">{month.month}</h1>
                <div className="space-y-3">{transactionList}</div>
            </div>
        );
    });

    // Main UI
    return (
        <div className="mx-auto max-w-6xl space-y-7">
            <div><h1 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">Transactions</h1></div>

            <div className="flex flex-wrap gap-3"><button className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm transition hover:bg-slate-50" onClick={() => navigate("/recurring-transactions")}>
                Recurring Transactions
            </button>

            <button className="rounded-xl bg-[#318097] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#225969]" onClick={() => navigate("/add-transaction")}>Add Transaction</button>

            {deleteMode ? (
                <>
                    <button className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                        disabled={selectedTransactions.length === 0}
                        onClick={async () => {
                            await deleteTransactions(selectedTransactions);
                            setSelectedTransactions([]);
                            setDeleteMode(false);
                            await loadTransactions();
                        }}
                    >
                        Delete Selected
                    </button>

                    <button className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                        onClick={() => {
                            setDeleteMode(false);
                            setSelectedTransactions([]);
                        }}
                    >
                        Cancel
                    </button>
                </>
            ) : (
                <button className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-700 transition hover:bg-red-100"
                    onClick={() => {
                        setDeleteMode(true);
                        setSelectedTransactions([]);
                    }}
                >
                    Delete Transaction
                </button>
            )}</div>

            <div className="space-y-3"><h2 className="text-sm font-semibold text-slate-700">Filter</h2><div className="flex flex-wrap gap-2">

            <button className={`rounded-xl px-4 py-2 text-sm font-medium transition ${filter === "this_month" ? "bg-[#318097] text-white" : "bg-white text-slate-600 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"}`} onClick={() => setFilter("this_month")}>This Month</button>
            <button className={`rounded-xl px-4 py-2 text-sm font-medium transition ${filter === "3_months" ? "bg-[#318097] text-white" : "bg-white text-slate-600 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"}`} onClick={() => setFilter("3_months")}>3 Months</button>
            <button className={`rounded-xl px-4 py-2 text-sm font-medium transition ${filter === "6_months" ? "bg-[#318097] text-white" : "bg-white text-slate-600 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"}`} onClick={() => setFilter("6_months")}>6 Months</button>
            <button className={`rounded-xl px-4 py-2 text-sm font-medium transition ${filter === "1_year" ? "bg-[#318097] text-white" : "bg-white text-slate-600 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"}`} onClick={() => setFilter("1_year")}>1 year</button>
            <button className={`rounded-xl px-4 py-2 text-sm font-medium transition ${filter === "all_time" ? "bg-[#318097] text-white" : "bg-white text-slate-600 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"}`} onClick={() => setFilter("all_time")}>All Time</button></div></div>

            <div className="space-y-4">{monthList}</div>

        </div>
    );
}

export default Transactions;
