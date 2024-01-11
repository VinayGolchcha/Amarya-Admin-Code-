import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import MainPage from "./MainPage";
import AssetsPage from "./Pages/AssetsPage";

const App = () => {
  return (
    <BrowserRouter>
      <MainPage />
    </BrowserRouter>
  );
};

export default App;
