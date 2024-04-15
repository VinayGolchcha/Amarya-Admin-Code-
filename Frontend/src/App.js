import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import MainPage from "./MainPage";
import AssetsPage from "./Pages/AssetsPage";
import { AuthProvider } from "./Components/AuthContext";

const App = () => {
  return (
    <AuthProvider>
    <BrowserRouter>
      <MainPage />
    </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
