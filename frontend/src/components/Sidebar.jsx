import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../services/authServices";

function Sidebar() {

    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (

        <aside>

            <h1>Finance Manager</h1>

            <NavLink to="/dashboard" className={({ isActive }) =>
                isActive ? "active" : ""
            }>Dashboard</NavLink>

            <NavLink to="/portfolio" >portfolio</NavLink>

            <NavLink to="/transactions" >Transactions</NavLink>

            <NavLink to="/recurring-transactions" >Recurring Transactions</NavLink>

            <button onClick={handleLogout}>
                Logout
            </button>

        </aside>

    )

}

export default Sidebar;