import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './Pages/LoginPage'
import MainPage from './MainPage';
import AssetsPage from './Pages/AssetsPage';

const App = () => {
  return (
   <BrowserRouter>
    <Routes>
        {/* <Route path='/' element={<LoginPage/>}/> */}
        <Route path='/home' element={<MainPage/>}/>
        <Route path='/asset' element={<AssetsPage/>}/>
    </Routes>
    <MainPage/>
   </BrowserRouter>
  )
}

export default App