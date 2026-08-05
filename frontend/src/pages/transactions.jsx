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
        // eslint-disable-next-line react-hooks/set-state-in-effect, react-hooks/exhaustive-deps
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
        return <h1 className="page-title text-xl font-semibold">Loading...</h1>;
    }

    // Render Helpers
    const monthList = transactions.months.map((month) => {
        const transactionList = month.transactions.map((transaction) => {
            return (
                <div key={transaction.id} className="transaction-row flex flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                        <strong className="transaction-description block truncate">{transaction.description}</strong>
                        <div className="transaction-meta mt-1 flex flex-wrap gap-x-3 gap-y-1 text-sm">
                            <span className="capitalize">{transaction.transaction_type}</span>
                            <span>{new Date(transaction.transaction_date).toLocaleDateString()}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 sm:justify-end">
                        <p className={`font-semibold ${transaction.transaction_type === "income" ? "transaction-amount-income" : "transaction-amount-expense"}`}>
                            {transaction.transaction_type === "income" ? `+${transaction.amount}` : `-${transaction.amount}`}
                        </p>
                    {deleteMode ? (
                        <input className="h-4 w-4 rounded text-red-600 focus:ring-red-500"
                            type="checkbox"
                            checked={selectedTransactions.includes(transaction.id)}
                            onChange={() => handleCheckbox(transaction.id)}
                        />
                    ) : (
                        
                        <button className="transaction-edit-button rounded-xl border px-4 py-2 text-sm font-medium transition" onClick={() => navigate(`/edit-transaction/${transaction.id}`)}>
                            Edit Transaction
                        </button>
                    )}
                    </div>
                </div>
            );
        });

        return (
            <div key={month.month} className="transaction-month-card space-y-3 rounded-2xl border p-5 shadow-sm">
                <h1 className="transaction-month-title text-lg font-semibold">{month.month}</h1>
                <div className="space-y-3">{transactionList}</div>
            </div>
        );
    });

    // Main UI
    return (
        <div className="transactions-page mx-auto max-w-6xl space-y-7">
            <div><h1 className="page-title text-2xl font-bold tracking-tight sm:text-3xl">Transactions</h1></div>

            <div className="flex flex-wrap gap-3"><button className="txn-page-btn-secondary rounded-xl border px-4 py-2.5 text-sm font-medium shadow-sm transition" onClick={() => navigate("/recurring-transactions")}>
                Recurring Transactions
            </button>

            <button className="txn-page-btn-add rounded-xl px-4 py-2.5 text-sm font-medium shadow-sm transition" onClick={() => navigate("/add-transaction")}>+ Add Transaction</button>

            {deleteMode ? (
                <>
                    <button className="txn-page-btn-delete-active rounded-xl px-4 py-2.5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50"
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

                    <button className="txn-page-btn-secondary rounded-xl border px-4 py-2.5 text-sm font-medium transition"
                        onClick={() => {
                            setDeleteMode(false);
                            setSelectedTransactions([]);
                        }}
                    >
                        Cancel
                    </button>
                </>
            ) : (
                <button className="txn-page-btn-delete rounded-xl border px-4 py-2.5 text-sm font-medium transition"
                    onClick={() => {
                        setDeleteMode(true);
                        setSelectedTransactions([]);
                    }}
                >
                    Delete Transaction
                </button>
            )}</div>

            <div className="space-y-3"><h2 className="txn-filter-title text-sm font-semibold">Filter</h2><div className="flex flex-wrap gap-2">

            <button className={`rounded-xl px-4 py-2 text-sm font-medium transition ${filter === "this_month" ? "txn-filter-active" : "txn-filter-inactive"}`} onClick={() => setFilter("this_month")}>This Month</button>
            <button className={`rounded-xl px-4 py-2 text-sm font-medium transition ${filter === "3_months" ? "txn-filter-active" : "txn-filter-inactive"}`} onClick={() => setFilter("3_months")}>3 Months</button>
            <button className={`rounded-xl px-4 py-2 text-sm font-medium transition ${filter === "6_months" ? "txn-filter-active" : "txn-filter-inactive"}`} onClick={() => setFilter("6_months")}>6 Months</button>
            <button className={`rounded-xl px-4 py-2 text-sm font-medium transition ${filter === "1_year" ? "txn-filter-active" : "txn-filter-inactive"}`} onClick={() => setFilter("1_year")}>1 year</button>
            <button className={`rounded-xl px-4 py-2 text-sm font-medium transition ${filter === "all_time" ? "txn-filter-active" : "txn-filter-inactive"}`} onClick={() => setFilter("all_time")}>All Time</button></div></div>

            <div className="space-y-4">{monthList}</div>

        </div>
    );
}

export default Transactions;
