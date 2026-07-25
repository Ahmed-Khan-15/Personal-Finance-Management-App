import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("Redirecting to login");
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
