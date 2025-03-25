import React from "react";
import { Navigate} from "react-router";
import { useAuthStore } from "../store/authStore";
import { decryptData } from "../services/utils/crypto-utils";

interface ProtectedDashboardProps {
  children: React.ReactNode;
}

const ProtectedDashboard: React.FC<ProtectedDashboardProps> = ({
  children,
}) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
 
  // ✅ Check localStorage in case Zustand state resets on refresh
  const getAccessToken = () => {
    const storedToken = localStorage.getItem("accessToken");
    return storedToken ? decryptData(storedToken) : null;
  };

  const token = getAccessToken();
  if (!isAuthenticated && !token) {
    localStorage.removeItem("accessToken"); 
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("userName");
    localStorage.removeItem("isAuthenticated");
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedDashboard;
