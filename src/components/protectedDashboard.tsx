

import React from "react";
import { Navigate } from "react-router"; 
import { useAuthStore } from "../store/authStore";

interface ProtectedDashboardProps {
  children: React.ReactNode;
}

const ProtectedDashboard: React.FC<ProtectedDashboardProps> = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // ✅ Check localStorage in case Zustand state resets on refresh
  const token = localStorage.getItem("authToken");

  if (!isAuthenticated && !token) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedDashboard;
