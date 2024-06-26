import React from "react";
import Login from "./Authorize/Login";
import Register from "./Authorize/Register2";
import ForgotPsk from "./pages/ForgotPsk";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import OtpVerification from "./Authorize/OtpVerification";
import Profile from "./pages/Profile";
import { useAuth } from "./context/Auth";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./pages/PrivateRoute";
import Homepage from "./pages/Homepage";
import ResetPassword from "./Authorize/ResetPassword";
// import ResetpasswordPage from "./"
import Logout from "./Authorize/Logout";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import PageNotFound from "./PageNotFound";

function App() {
  const [auth, setAuth] = useAuth();

  return (
    <>
     <Navbar></Navbar>
      <Routes>
        <Route path="/resetpassword" element={<ResetPassword />} />
        {/* <Route path="/resetpasswordPage" element={<ResetpasswordPage />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPsk />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Logout" element={<Logout />} />
        <Route path="/Otp" element={<OtpVerification />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
        <Route path="" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<Homepage/>} />


      </Routes>
    </>
  );
}

export default App;
