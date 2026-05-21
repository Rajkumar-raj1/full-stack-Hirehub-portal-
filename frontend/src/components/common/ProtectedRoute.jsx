import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const token = localStorage.getItem("accessToken");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // User not logged in
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Role-based protection
  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user.role)
  ) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;