import { Routes, Route } from "react-router-dom";
import Login from "./pages/login.jsx";
import Signup from "./pages/signup.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import PublicRoute from "./components/PublicRoute.jsx";
import Dashboard from "./pages/dashboard.jsx";
import Portfolio from "./pages/portfolio.jsx";
import Transactions from "./pages/transactions.jsx";
import RecurringTransactions from "./pages/recurringTransactions.jsx";
import AddTransaction from "./pages/addTransaction.jsx";
import EditTransaction from "./pages/editTransaction.jsx";
import EditRecurringTransaction from "./pages/editRecurringTransaction.jsx";


function App() {
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        ></Route>
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        ></Route>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
        </Route>
        <Route
          path="/portfolio"
          element={
            <ProtectedRoute>
              <Portfolio />
            </ProtectedRoute>
          }
        >
        </Route>
        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <Transactions />
            </ProtectedRoute>
          }
        >
        </Route>
        <Route
          path="/recurring-transactions"
          element={
            <ProtectedRoute>
              <RecurringTransactions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-transaction"
          element={
            <ProtectedRoute>
              <AddTransaction />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-transaction/:id"
          element={
            <ProtectedRoute>
              <EditTransaction />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-recurring-transaction/:id"
          element={
            <ProtectedRoute>
              <EditRecurringTransaction />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
