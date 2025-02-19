import { Navigate } from "react-router";
import { isSignedUp } from "../utils/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  if (!isSignedUp()) {
    return <Navigate to="/signup" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
