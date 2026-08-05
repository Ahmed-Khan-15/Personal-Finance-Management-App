import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

function Layout(){
    const [theme, setTheme] = useState(() => localStorage.getItem("finance-theme") || "dark");

    useEffect(() => {
        localStorage.setItem("finance-theme", theme);
    }, [theme]);

    const isDark = theme === "dark";

    return (
        <div className={`app-shell theme-${theme} min-h-screen lg:flex`}>
            <Sidebar />
            <main className="page-theme min-w-0 flex-1 p-4 sm:p-6 lg:ml-64 lg:p-10">
            <div className="mb-6 flex justify-end">
                <button
                    type="button"
                    onClick={() => setTheme(isDark ? "light" : "dark")}
                    aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
                    aria-pressed={!isDark}
                    className="theme-toggle cursor-pointer inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-medium shadow-sm transition"
                >
                    {isDark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
                    {isDark ? "Light theme" : "Dark theme"}
                </button>
            </div>
            <Outlet context={{ theme, isDark }} />
            </main>
        </div>
)
}

export default Layout;
