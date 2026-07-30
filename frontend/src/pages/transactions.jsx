import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/authServices";
import getTransactions from "../services/transactionServices";

function Transactions() {

    const navigate = useNavigate();

    // Delete Mode Function

    const [deleteMode, setDeleteMode] = useState(false);

    const [selectedTransactions, setSelectedTransactions] = useState([]);

    const [transactions, setTransactions] = useState(null);

    const [filter, setFilter] = useState("this_month");

    // Handlers

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
        }
        else {
            setSelectedTransactions([...selectedTransactions, id]);
        }
    }

    useEffect(() => {

        async function loadTransactions() {

            try {

                const data = await getTransactions(filter);
                setSelectedTransactions([]);
                setTransactions(data);

            } catch (error) {
                console.error(error);
            }

        }

        loadTransactions();

    }, [filter]);

    if (!transactions) {
        return <h1>Loading...</h1>;
    }

    const monthList = transactions.months.map((month) => {

        const transactionList = month.transactions.map((transaction) => {

            return (
                <div key={transaction.id}>
                    <strong>{transaction.description}</strong>
                    <p>{transaction.transaction_type === "income"
                        ? `+${transaction.amount}`
                        : `-${transaction.amount}`}</p>
                    <p>{transaction.transaction_type}</p>
                    <p>Date: {new Date(transaction.transaction_date).toLocaleDateString()}</p>
                    {
                        deleteMode
                            ? <input type="checkbox" checked={selectedTransactions.includes(transaction.id)}
                                onChange={() => handleCheckbox(transaction.id)} />
                            : <button>Edit</button>
                    }
                </div>

            );

        })
        return (

            <div key={month.month}>
                <h1>{month.month}</h1>
                {transactionList}
                <hr />
            </div>
        );
    })

    return (
        <>
            <h1>Transactions</h1>

            <button>Add Transaction</button>
            {
                deleteMode
                    ? (
                        <>
                            <button>Delete Selected</button>
                            <button onClick={() => {
                                setDeleteMode(false)
                                setSelectedTransactions([]);
                            }
                            }
                            >
                                Cancel
                            </button>
                        </>
                    )
                    : (
                        <button onClick={() => {
                            setDeleteMode(true);
                            setSelectedTransactions([]);
                        }}>
                            Delete Transaction
                        </button>
                    )
            }

            <h2>Filter</h2>

            <button onClick={() => setFilter("this_month")}>
                This Month
            </button>

            <button onClick={() => setFilter("3_months")}>
                3 Months
            </button>

            <button onClick={() => setFilter("6_months")}>
                6 Months
            </button>

            <button onClick={() => setFilter("1_year")}>
                1 year
            </button>

            <button onClick={() => setFilter("all_time")}>
                All Time
            </button>
            <button>Custom Range</button>

            {monthList}

            <button onClick={handleLogout}>
                Logout
            </button>
        </>
    );
}

export default Transactions;