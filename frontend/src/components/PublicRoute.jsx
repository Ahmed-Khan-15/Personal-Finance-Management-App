import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {
  const token = localStorage.getItem("token");

  if (token) {
    console.log("Redirecting to login");
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default PublicRoute;
