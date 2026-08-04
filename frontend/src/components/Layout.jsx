import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function Layout(){

    return (
        <div className="min-h-screen bg-slate-50 lg:flex">
            <Sidebar />
            <main className="min-w-0 flex-1 p-4 sm:p-6 lg:ml-64 lg:p-10">
            <Outlet />
            </main>
        </div>
)
}

export default Layout;
