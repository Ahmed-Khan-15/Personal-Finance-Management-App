import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRecurringTransactions, deleteRecurringTransactions } from "../services/recurringTransactionsServices";

function RecurringTransactions() {
    const navigate = useNavigate();

    // State
    const [deleteMode, setDeleteMode] = useState(false);
    const [selectedTransactions, setSelectedTransactions] = useState([]);
    const [transactions, setTransactions] = useState(null);

    // Data Fetching
    async function loadTransactions() {
        try {
            const data = await getRecurringTransactions();
            setSelectedTransactions([]);
            setTransactions(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        loadTransactions();
    }, []);

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
    const transactionList = transactions.map((transaction) => {
        return (
            <div key={transaction.id} className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div><strong className="text-lg text-slate-800">{transaction.description}</strong>

                <p>
                    {transaction.transaction_type === "income"
                        ? `+${transaction.amount}`
                        : `-${transaction.amount}`}
                </p>

                <p>{transaction.transaction_type}</p>

                <p>
                    Start Date: {new Date(transaction.start_date).toLocaleDateString()}
                </p>
                <p>End Date: {
                    transaction.end_date
                        ? new Date(transaction.end_date).toLocaleDateString()
                        : "Never"
                }</p>

                <p className="text-sm capitalize text-slate-500">{transaction.repeat_interval}</p></div>

                {deleteMode ? (
                    <input className="h-4 w-4 rounded border-slate-300 text-red-600 focus:ring-red-500"
                        type="checkbox"
                        checked={selectedTransactions.includes(transaction.id)}
                        onChange={() => handleCheckbox(transaction.id)}
                    />
                ) : (
                    <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50" onClick={() => { navigate(`/edit-recurring-transaction/${transaction.id}`) }}>Edit</button>
                )}
            </div>
        );
    });

    // Main UI
    return (
        <div className="mx-auto max-w-6xl space-y-7">
            <div><h1 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">Recurring Transactions</h1></div>

            <div className="flex flex-wrap gap-3"><button className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm transition hover:bg-slate-50" onClick={() => navigate("/transactions")}>Transactions</button>

            <button className="rounded-xl bg-[#318097] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#225969]" onClick={() => { navigate("/add-transaction") }}>Add Recurring Transaction</button>

            {deleteMode ? (
                <>
                    <button className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                        disabled={selectedTransactions.length === 0}
                        onClick={async () => {
                            await deleteRecurringTransactions(selectedTransactions);
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
                    Delete Recurring Transaction
                </button>
            )}</div>

            <div className="space-y-4">{transactionList}</div>

        </div>
    );
}

export default RecurringTransactions;
