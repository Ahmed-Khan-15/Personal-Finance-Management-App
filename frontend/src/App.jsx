import { Routes, Route } from "react-router-dom";
import Login from "./pages/login.jsx";
import Signup from "./pages/signup.jsx";
import Landing from "./pages/landing.jsx";
import Dashboard from "./pages/dashboard.jsx";
import Portfolio from "./pages/portfolio.jsx";
import Transactions from "./pages/transactions.jsx";
import RecurringTransactions from "./pages/recurringTransactions.jsx";
import AddTransaction from "./pages/addTransaction.jsx";
import EditTransaction from "./pages/editTransaction.jsx";
import EditRecurringTransaction from "./pages/editRecurringTransaction.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";
import PublicRoute from "./components/PublicRoute.jsx";
import Layout from "./components/Layout.jsx";

function App() {
  return (
    <Routes>

      {/* Public Routes */}
      <Route
        path="/"
        element={
          <PublicRoute>
            <Landing />
          </PublicRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />

      {/* Protected Routes */}
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/portfolio" element={<Portfolio />} />

        <Route path="/transactions" element={<Transactions />} />

        <Route
          path="/recurring-transactions"
          element={<RecurringTransactions />}
        />

        <Route
          path="/add-transaction"
          element={<AddTransaction />}
        />

        <Route
          path="/edit-transaction/:id"
          element={<EditTransaction />}
        />

        <Route
          path="/edit-recurring-transaction/:id"
          element={<EditRecurringTransaction />}
        />
      </Route>

    </Routes>
  );
}

export default App;