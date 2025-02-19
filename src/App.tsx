import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home.tsx";
import SignUp from "./pages/SignUp.tsx";
import Login from "./pages/Login.tsx";
import VerifyOtp from "./pages/VerifyOtp.tsx";
import RegSuccessful from "./pages/RegSuccessful.tsx";
import ResetPassword from "./pages/ResetPassword.tsx";
import RecoverAccount from "./pages/RecoverAccount.tsx";
import Dashboard from "./pages/Logged_in/Dashboard.tsx";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedDashboard from "./components/protectedDashboard";
import AuthWrapper from "./components/AuthWrapper";
import { useAuthStore } from "./store/authStore.ts";
import { useEffect } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/verify-otp",
    element: (
      <ProtectedRoute>
        <VerifyOtp />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedDashboard>
        <Dashboard />
      </ProtectedDashboard>
    ),
  },


  {
    path: "/dashboad_links",
    element: <ResetPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/auth-account",
    element: <RecoverAccount />,
  },
  {
    path: "/success",
    element: <RegSuccessful />,
  },
]);

function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <AuthWrapper>
      <RouterProvider router={router} />
    </AuthWrapper>
  );
}

export default App;
