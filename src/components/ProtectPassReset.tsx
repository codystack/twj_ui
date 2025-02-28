import React from "react";
import { Navigate } from "react-router"; 
import { usenewPasswordStore } from "../store/newPasswordstore";

interface ProtectPassResetProps {
  children: React.ReactNode;
}

const ProtectPassReset: React.FC<ProtectPassResetProps> = ({ children }) => {
  const { authOtp } = usenewPasswordStore();
  const email = localStorage.getItem("forgotPasswordEmail");

  // Redirect to default page if OTP is not verified or email is missing
  if (!authOtp && !email) {
    return <Navigate to="/email_for_reset_password" replace />;
  }

  return <>{children}</>;
};

export default ProtectPassReset;
