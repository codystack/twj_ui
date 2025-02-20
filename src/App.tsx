import { createBrowserRouter, RouterProvider } from "react-router";
// import Home from "./pages/Home.tsx";
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
import DashboardLinks from "./pages/Logged_in/DashboardLinks.tsx";
import Bills from "./pages/Logged_in/Bills.tsx";
import GiftCards from "./pages/Logged_in/GiftCards.tsx";
import Crypto from "./pages/Logged_in/Crypto.tsx";
import Wallet from "./pages/Logged_in/Wallet.tsx";
import Transaction from "./pages/Logged_in/Transaction.tsx";
import Profile from "./pages/Logged_in/Profile.tsx";
import Rates from "./pages/Logged_in/Rates.tsx";

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <Home />,
  // },

  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
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
    children: [
      {
        path: "/dashboard/dashboard",
        element: <DashboardLinks />,
      },
      {
        path: "/dashboard/bills",
        element: <Bills />,
      },
      {
        path: "/dashboard/giftcards",
        element: <GiftCards />,
      },
      {
        path: "/dashboard/cryptos",
        element: <Crypto />,
      },
      {
        path: "/dashboard/wallet",
        element: <Wallet />,
      },
      {
        path: "/dashboard/transaction",
        element: <Transaction />,
      },
      {
        path: "/dashboard/profile",
        element: <Profile />,
      },
      {
        path: "/dashboard/rate",
        element: <Rates />,
      },
    ],
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
