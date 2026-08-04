import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../services/authServices";

function Sidebar() {

    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/login");
    }

    const linkClasses = ({ isActive }) =>
        `px-4 py-3 rounded-xl font-medium transition-colors duration-200 ${
            isActive
                ? "bg-white text-[#318097] shadow-sm"
                : "text-white hover:bg-white/20"
        }`;

    return (
        <aside className="relative flex w-full flex-col bg-[#318097] p-4 shadow-sm lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:w-64 lg:p-6">

            <h1 className="mb-4 text-xl font-bold tracking-tight text-white lg:mb-10 lg:text-2xl">
                Finance Manager
            </h1>

            <nav className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-3 lg:overflow-visible">

                <NavLink
                    to="/dashboard"
                    className={linkClasses}
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="/portfolio"
                    className={linkClasses}
                >
                    Portfolio
                </NavLink>

                <NavLink
                    to="/transactions"
                    className={linkClasses}
                >
                    Transactions
                </NavLink>

                <NavLink
                    to="/recurring-transactions"
                    className={linkClasses}
                >
                    Recurring Transactions
                </NavLink>

            </nav>

            <button
                onClick={handleLogout}
                className="mt-4 rounded-xl border border-white/30 bg-[#225969] px-4 py-2.5 font-medium text-white transition-colors duration-200 hover:bg-white/20 lg:mt-auto lg:py-3"
            >
                Logout
            </button>

        </aside>
    );
}

export default Sidebar;
