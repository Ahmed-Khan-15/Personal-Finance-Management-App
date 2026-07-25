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
    
    const transactionList = dashboard.recentTransactions.map((transaction) => {
        return <h2>{transaction.description}</h2>;
    })
    return (
        <>
            <h1>Dashboard</h1>

            <h2>Income: {dashboard.income}</h2>

            <h2>Expense: {dashboard.expense}</h2>

            <h2>Recent Transactions</h2>


            <button onClick={handleLogout}>
                Logout
            </button>
        </>
    );
}

export default Dashboard;