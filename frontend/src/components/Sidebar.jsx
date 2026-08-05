import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../services/authServices";
import { Menu, X } from "lucide-react";
import { useState } from "react";

function Sidebar() {

    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    function handleLogout() {
        logout();
        navigate("/login");
    }

    function closeMenu() {
        setIsOpen(false);
    }

    const linkClasses = ({ isActive }) =>
        `px-4 py-3 rounded-xl font-medium transition-colors duration-200 ${
            isActive
                ? "bg-white text-[#318097] shadow-sm"
                : "text-white hover:bg-white/20"
        }`;

    return (
        <aside className="sticky top-0 z-30 w-full bg-[#318097] p-3 shadow-sm lg:fixed lg:left-0 lg:top-0 lg:flex lg:h-screen lg:w-64 lg:flex-col lg:p-6">
            <div className="flex items-center justify-between gap-3 lg:block">
                <h1 className="text-lg font-bold tracking-tight text-white sm:text-xl lg:mb-10 lg:text-2xl">
                    Finance Manager
                </h1>

                <button
                    type="button"
                    onClick={() => setIsOpen((open) => !open)}
                    aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                    aria-expanded={isOpen}
                    className="inline-flex rounded-lg p-2 text-white transition hover:bg-white/15 lg:hidden"
                >
                    {isOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            <div className={`${isOpen ? "mt-3 grid" : "hidden"} gap-3 lg:mt-0 lg:flex lg:flex-1 lg:flex-col`}>
                <nav className="grid gap-2 sm:grid-cols-2 lg:flex lg:flex-col lg:gap-3">

                <NavLink
                    to="/dashboard"
                    onClick={closeMenu}
                    className={linkClasses}
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="/portfolio"
                    onClick={closeMenu}
                    className={linkClasses}
                >
                    Portfolio
                </NavLink>

                <NavLink
                    to="/transactions"
                    onClick={closeMenu}
                    className={linkClasses}
                >
                    Transactions
                </NavLink>

                <NavLink
                    to="/recurring-transactions"
                    onClick={closeMenu}
                    className={linkClasses}
                >
                    Recurring Transactions
                </NavLink>

                </nav>

                <button
                    onClick={handleLogout}
                    className="rounded-xl border border-white/30 bg-[#225969] px-4 py-2.5 font-medium text-white transition-colors duration-200 hover:bg-white/20 lg:mt-auto lg:py-3"
                >
                    Logout
                </button>
            </div>

        </aside>
    );
}

export default Sidebar;
