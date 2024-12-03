import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Auth } from "./context/authContext";
import Weather from "./components/Weather";
import SignUpComponent from "./components/SignUpComponent";
import OTPComponent from "./components/OTPComponent";
import ForgotPasswordComponent from "./components/ForgotPasswordComponent";
import LoginComponent from "./components/LoginComponent";
import HomePage from "./components/HomePage";

function App() {
  return (
    <Auth>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/signup" element={<SignUpComponent />} />
          <Route path="/otp" element={<OTPComponent />} />
          <Route path="/forgot-password" element={<ForgotPasswordComponent />} />
          <Route path="/login" element={<LoginComponent />} />
        </Routes>
      </Router>
    </Auth>
  );
}

export default App;
