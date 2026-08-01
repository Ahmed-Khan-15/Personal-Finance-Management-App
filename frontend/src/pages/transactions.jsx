import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/authServices";
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
    const monthList = transactions.months.map((month) => {
        const transactionList = month.transactions.map((transaction) => {
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
                        Date:{" "}
                        {new Date(transaction.transaction_date).toLocaleDateString()}
                    </p>
                    {deleteMode ? (
                        <input
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
            <div key={month.month}>
                <h1>{month.month}</h1>
                {transactionList}
                <hr />
            </div>
        );
    });

    // Main UI
    return (
        <>
            <h1>Transactions</h1>

            <button onClick={() => navigate("/recurring-transactions")}>
                Recurring Transactions
            </button>

            <button onClick={() => navigate("/add-transaction")}>Add Transaction</button>

            {deleteMode ? (
                <>
                    <button
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
                    Delete Transaction
                </button>
            )}

            <h2>Filter</h2>

            <button onClick={() => setFilter("this_month")}>This Month</button>
            <button onClick={() => setFilter("3_months")}>3 Months</button>
            <button onClick={() => setFilter("6_months")}>6 Months</button>
            <button onClick={() => setFilter("1_year")}>1 year</button>
            <button onClick={() => setFilter("all_time")}>All Time</button>
            <button>Custom Range</button>

            {monthList}

            <button onClick={handleLogout}>Logout</button>
        </>
    );
}

export default Transactions;