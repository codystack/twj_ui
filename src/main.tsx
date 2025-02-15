import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import "./index.css";
// import App from "./App.tsx";
import SignUp from "./pages/SignUp.tsx";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import VerifyOtp from "./pages/VerifyOtp.tsx";
import RegSuccessful from "./pages/RegSuccessful.tsx";
import ResetPassword from "./pages/ResetPassword.tsx";
import RecoverAccount from "./pages/RecoverAccount.tsx";

let router = createBrowserRouter([

  {
    path : "/",
    element: <Home/>
  },

  {
    path : "/signup",
    element: <SignUp/>
  },
  {
    path : "/verify-otp",
    element: <VerifyOtp/>
  },
  {
    path : "/login",
    element: <Login/>
  },
  {
    path : "/reset-password",
    element: <ResetPassword/>
  },
  {
    path : "/auth-account",
    element: <RecoverAccount/>
  },
  {
    path : "/success",
    element: <RegSuccessful/>
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
);
