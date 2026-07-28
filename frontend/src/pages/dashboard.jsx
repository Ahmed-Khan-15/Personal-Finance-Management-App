import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/authServices";
import getDashboard from "../services/dashboardServices";

function Dashboard() {

    const navigate = useNavigate();

    const [dashboard, setDashboard] = useState(null);

    function handleLogout() {
        logout();
        navigate("/login");
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
        return <h1>Loading...</h1>;
    }
    
    const categoryList = dashboard.categories.map((category) => {

        const transactionList = category.transactions.map( (transaction) =>{
        
            return (
                <div key = {transaction.id}>
            <strong>{transaction.description}</strong>
            <p>Amount: {transaction.amount}</p>
            <p>{transaction.transaction_type}</p>
            <p>Date: {transaction.transaction_date}</p>
            </div>
                
            );
        
        })
        return (
        
    <div key = {category.id}>
    <strong>{category.name}</strong>
    <p>Total: {category.total}</p>
    {transactionList}
    <hr />
    </div>
    );
})

    return (
        <>
            <h1>Dashboard</h1>

            <h2>Income: {dashboard.income}</h2>

            <h2>Expense: {dashboard.expense}</h2>

            <h2>Savings: {dashboard.savings}</h2>

            <h2>Monthly Transactions</h2>

            {categoryList}

            <button onClick={handleLogout}>
                Logout
            </button>
        </>
    );
}

export default Dashboard;