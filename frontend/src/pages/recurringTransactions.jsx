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
        // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/set-state-in-effect
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
        return <h1 className="page-title text-xl font-semibold">Loading...</h1>;
    }

    // Render Helpers
    const transactionList = transactions.map((transaction) => {
        return (
            <div key={transaction.id} className="recurring-transaction-card flex flex-col gap-4 rounded-2xl border p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                    <strong className="transaction-description block truncate text-lg">{transaction.description}</strong>
                    <div className="transaction-meta mt-1 flex flex-wrap gap-x-3 gap-y-1 text-sm">
                        <span className="capitalize">{transaction.transaction_type}</span>
                        <span className="capitalize">Repeats {transaction.repeat_interval}</span>
                        <span>Starts {new Date(transaction.start_date).toLocaleDateString()}</span>
                        <span>Ends {transaction.end_date ? new Date(transaction.end_date).toLocaleDateString() : "Never"}</span>
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
                    <button className="transaction-edit-button rounded-xl border px-4 py-2 text-sm font-medium transition" onClick={() => { navigate(`/edit-recurring-transaction/${transaction.id}`) }}>Edit</button>
                )}
                </div>
            </div>
        );
    });

    // Main UI
    return (
        <div className="recurring-transactions-page mx-auto max-w-6xl space-y-7">
            <div><h1 className="page-title text-2xl font-bold tracking-tight sm:text-3xl">Recurring Transactions</h1></div>

            <div className="grid gap-3 sm:flex sm:flex-wrap"><button className="txn-page-btn-secondary w-full rounded-xl border px-4 py-2.5 text-sm font-medium shadow-sm transition sm:w-auto" onClick={() => navigate("/transactions")}>Transactions</button>

            <button className="txn-page-btn-add w-full rounded-xl px-4 py-2.5 text-sm font-medium shadow-sm transition sm:w-auto" onClick={() => { navigate("/add-transaction") }}>+ Add Recurring Transaction</button>

            {deleteMode ? (
                <>
                    <button className="txn-page-btn-delete-active w-full rounded-xl px-4 py-2.5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
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

                    <button className="txn-page-btn-secondary w-full rounded-xl border px-4 py-2.5 text-sm font-medium transition sm:w-auto"
                        onClick={() => {
                            setDeleteMode(false);
                            setSelectedTransactions([]);
                        }}
                    >
                        Cancel
                    </button>
                </>
            ) : (
                <button className="txn-page-btn-delete w-full rounded-xl border px-4 py-2.5 text-sm font-medium transition sm:w-auto"
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
