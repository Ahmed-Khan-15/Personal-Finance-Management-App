import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import Card from "../components/Card";
import CountUp from "../components/CountUp";
import ShinyText from "../components/ShinyText";
import getDashboard from "../services/dashboardServices";
  

function Dashboard() {
    const { isDark } = useOutletContext();
    const [isHovered, setIsHovered] = useState(false);
    const [dashboard, setDashboard] = useState(null);
    const [expandedCategories, setExpandedCategories] = useState({});

    function toggleCategory(categoryId) {
        setExpandedCategories((prev) => ({
            ...prev,
            [categoryId]: !prev[categoryId],
        }));
    }

    function formatDate(dateString) {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString("en-GB", {
            month: "short",
            day: "numeric",
        });
    }

    const currentMonth = new Date().toLocaleString("en-US", { month: "long" });

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
        return <h1 className="text-xl font-semibold text-slate-200">Loading...</h1>;
    }


    function getGreeting() {
        const hour = new Date().getHours();

        if (hour >= 5 && hour < 12) {
            return "Good Morning,";
        } else if (hour >= 12 && hour < 17) {
            return "Good Afternoon,";
        } else if (hour >= 17 && hour < 22) {
            return "Good Evening,";
        } else {
            return "Working Late?";
        }
    }
    const greeting = getGreeting();

    const categoryList = dashboard.categories.map((category) => {
        const transactionList = category.transactions.map((transaction) => {
            return (
                <div
                    key={transaction.id}
                    className="flex flex-col gap-1 rounded-xl border border-[#3D7180] bg-[#4ca5c775] p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                    <div >
                        <strong className="text-slate-100">
                            {transaction.description}
                        </strong>
                        <p className="text-sm text-[#f8e7e7]">
                            Date:  {formatDate(transaction.transaction_date)}
                        </p>
                    </div>
                    <div className="sm:text-right">
                        <p
                            className={`font-semibold ${transaction.transaction_type === "income" ? "text-emerald-600" : "text-[oklch(0.73_0.18_21.52)]"}`}
                        >
                            Rs. {Number(transaction.amount).toLocaleString()}
                        </p>
                        <p className="text-xs font-medium capitalize text-[#f8e7e7]">
                            {transaction.transaction_type}
                        </p>
                    </div>
                </div>
            );
        });
        return (
            <div
                key={category.id}
                className="rounded-2xl border border-[#4B7B89] bg-[#2d748a] shadow-sm shadow-black/15"
            >
                <button
                    onClick={() => toggleCategory(category.id)}
                    className="flex w-full cursor-pointer items-center justify-between p-5 text-slate-100"
                >
                    <div className="flex items-center gap-2">
                        <ChevronDown
                            className={`cursor-pointer transition-transform duration-300 ${expandedCategories[category.id]
                                    ? "rotate-180"
                                    : ""
                                }`}
                        />
                        <h3 className="text-lg font-semibold">{category.name}</h3>
                    </div>

                    {/* <div className="flex items-center gap-4">
                        <span className="font-semibold text-[#318097]">
                            Rs. {Number(category.total).toLocaleString()}
                        </span>

                    </div> */}
                </button>

                <div
                    className={`overflow-hidden transition-all duration-300 ${expandedCategories[category.id]
                            ? "max-h-[1000px] opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                >
                    <div className="space-y-3 border-t border-[#4B7B89] p-5">
                        {transactionList}
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div className="dashboard-page mx-auto max-w-7xl space-y-8">
            <div>
                <p className="text-lg text-[#FFFFFF]">{greeting}</p>

                <h1
                    className="mt-1 inline-block text-3xl font-bold"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <ShinyText
                        text={dashboard.username || "User"}
                        speed={2.6}
                        color={isDark ? "#f8fafc" : "#455574"}
                        shineColor={isDark ? "#318097" : "#f8fafc"}
                        disabled={!isHovered}
                    />
                </h1>
                <p className="mt-1 text-md font-medium text-[#FFFFFF]">Here's your financial summary for {currentMonth}.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <div className="dashboard-summary-card [&>div]:border-[#96daf0] [&>div]:bg-[#5f8e941a] [&>div]:shadow-black/10">
                    <Card>
                    <h2 className="text-sm font-medium text-[#FFFFFF]">Income</h2>
                    <p className="mt-3 text-2xl font-bold text-[#86efac]">
                        Rs. <CountUp to={Number(dashboard.income)} separator="," duration={.05} />
                    </p>
                    </Card>
                </div>

                <div className="dashboard-summary-card [&>div]:border-[#96daf0] [&>div]:bg-[#5f8e941a] [&>div]:shadow-black/10">
                    <Card>
                    <h2 className="text-sm font-medium text-[#FFFFFF]">Expense</h2>
                    <p className="mt-3 text-2xl font-bold text-[oklch(0.73_0.18_21.52)]">
                        Rs. <CountUp to={Number(dashboard.expense)} separator="," duration={.05} />
                    </p>
                    </Card>
                </div>

                <div className="dashboard-summary-card [&>div]:border-[#96daf0] [&>div]:bg-[#5f8e941a] [&>div]:shadow-black/10">
                    <Card>
                    <h2 className="text-sm font-medium text-[#FFFFFF]">Savings</h2>
                    <p className="mt-3 text-2xl font-bold text-[#5bb8d3]">
                        Rs. <CountUp to={Number(dashboard.savings)} separator="," duration={.05} />
                    </p>
                    </Card>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold text-slate-100">
                    Spending by Category
                </h2>

                <div className="space-y-4">{categoryList}</div>
            </div>
        </div>
    );
}

export default Dashboard;
