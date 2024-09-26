import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import MainPage from "./MainPage";
import AssetsPage from "./Pages/AssetsPage";
import { AuthProvider } from "./Components/AuthContext";
import { NotificationProvider } from "./ContextProvider/NotificationContext"; // Import NotificationProvider
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <AuthProvider>
      <NotificationProvider>
        <BrowserRouter>
          <MainPage />
          <ToastContainer />
        </BrowserRouter>
      </NotificationProvider>
    </AuthProvider>
  );
};

export default App;
