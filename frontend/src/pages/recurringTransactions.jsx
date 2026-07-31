import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    getRecurringTransactions,
    deleteRecurringTransactions,
} from "../services/recurringTransactionsServices";

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
    function handleLogout() {
        logout();
        navigate("/login");
    }

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
        return <h1>Loading...</h1>;
    }

    // Render Helpers
    const transactionList = transactions.map((transaction) => {
        return (
            <div key={transaction.id}>
                <strong>{transaction.description}</strong>

                <p>
                    {transaction.transaction_type === "income"
                        ? `+${transaction.amount}`
                        : `-${transaction.amount}`}
                </p>

                <p>{transaction.transaction_type}</p>

                <p>
                    Start Date: {new Date(transaction.start_date).toLocaleDateString()}
                </p>
                <p>End Date: {new Date(transaction.end_date).toLocaleDateString()}</p>

                <p>{transaction.repeat_interval}</p>

                {deleteMode ? (
                    <input
                        type="checkbox"
                        checked={selectedTransactions.includes(transaction.id)}
                        onChange={() => handleCheckbox(transaction.id)}
                    />
                ) : (
                    <button>Edit</button>
                )}
            </div>
        );
    });

    // Main UI
    return (
        <>
            <h1>Recurring Transactions</h1>

            <button onClick={() => navigate("/transactions")}>Transactions</button>

            <button>Add Recurring Transaction</button>

            {deleteMode ? (
                <>
                    <button
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

                    <button
                        onClick={() => {
                            setDeleteMode(false);
                            setSelectedTransactions([]);
                        }}
                    >
                        Cancel
                    </button>
                </>
            ) : (
                <button
                    onClick={() => {
                        setDeleteMode(true);
                        setSelectedTransactions([]);
                    }}
                >
                    Delete Recurring Transaction
                </button>
            )}

            <div>{transactionList}</div>

            <button onClick={handleLogout}>Logout</button>
        </>
    );
}

export default RecurringTransactions;